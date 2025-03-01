import { useEffect, useState } from "react";
import { supbase } from "../utils/supbaseClient";
import { User } from "@supabase/supabase-js";
import { IUser } from "../models/IUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IProduct from "../models/Product";
import { useAppDispach } from "../Store/hooks";
import { setCurrentUser } from "../Store/Slices/userSlice";

const useRegUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [curUser, setCurUser] = useState<IUser | null>(null);
  const dispatch = useAppDispach();

  useEffect(() => {
    if (!curUser?.id) return;

    const channel = supbase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `id=eq.${curUser.id}`,
        },
        (payload) => {
          if (payload.new) {
            // @ts-ignore
            setCurUser((prev) => ({ ...prev, ...payload.new }));
            // @ts-ignore
            dispatch(setCurrentUser(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supbase.removeChannel(channel);
    };
  }, [curUser?.id, dispatch]);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supbase.auth.getSession();
      if (error) {
        console.error("Ошибка получения сессии:", error);
      } else {
        setUser(session?.user || null);
        if (session?.user) {
          await getUserData(session.user.id);
        }
      }
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supbase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          await getUserData(session.user.id);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUser = async (user: { email: string; password: string }) => {
    const { data, error } = await supbase.auth.signInWithPassword(user);
    // @ts-ignore
    await getUserData(data.user?.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Success Authentication!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const getUserData = async (userId: string) => {
    const { data, error } = await supbase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Ошибка при получении пользователя:", error.message);
      return;
    }

    if (data) {
      setCurUser(data);
      dispatch(setCurrentUser(data));
    }
  };

  const updateUserCart = async (cart: number[], userId: string) => {
    setLoading(true);
    const { error } = await supbase
      .from("users")
      .update({ cart })
      .eq("id", userId);

    if (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const updateLikedProducts = async (products: IProduct[], userId: string) => {
    const { error } = await supbase
      .from("users")
      .update({ liked_products: products })
      .eq("id", userId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Cart updated successfully!");
    }
  };

  const addUser = async (user: IUser) => {
    const { data, error } = await supbase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          cart: user.cart,
          liked_products: user.liked_products,
        },
      },
    });

    if (error) {
      console.error("Ошибка:", error.message);
      return;
    }

    const { error: insertError } = await supbase.from("users").insert({
      ...user,
      id: data.user?.id,
    });

    if (insertError) {
      console.error("Ошибка при добавлении пользователя:", insertError.message);
    } else {
      toast.success("Please, check your email for registration.");
      setTimeout(() => navigate("/signup"), 2000);
    }
  };

  const signOutUser = async () => {
    const { error } = await supbase.auth.signOut();
    window.localStorage.clear();
    dispatch(setCurrentUser(null));
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Success Logout!");
    }
  };

  return {
    loading,
    user,
    addUser,
    signOutUser,
    updateUserCart,
    updateLikedProducts,
    curUser,
    signUser,
    getUserData,
  };
};

export default useRegUser;
