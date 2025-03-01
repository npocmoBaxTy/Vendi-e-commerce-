import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supbase } from "../../utils/supbaseClient";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { IUser } from "../../models/IUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Работаем через Supabase SDK
  endpoints: (builder) => ({
    // 🔹 Получение пользователя по ID
    getUserById: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supbase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();
        if (error) console.log(error);
        return { data };
      },
      async onCacheEntryAdded(id, { updateCachedData, cacheEntryRemoved }) {
        const channel = supbase
          .channel("users-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "users",
              filter: `id=eq.${id}`,
            },
            (payload: RealtimePostgresChangesPayload<IUser>) => {
              console.log("Обновление пользователя!", payload);
              if (payload.new) {
                updateCachedData((draft) => {
                  Object.assign(draft, payload.new);
                });
              }
            }
          )
          .subscribe();

        await cacheEntryRemoved;
        supbase.removeChannel(channel);
      },
    }),

    // 🔹 Регистрация пользователя
    createUser: builder.mutation({
      queryFn: async (user) => {
        const { error } = await supbase.from("users").insert(user);
        if (error) console.log(error);
        return { data: "User created successfully" };
      },
    }),

    // 🔹 Авторизация пользователя
    loginUser: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supbase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) console.log(error);
        return { data };
      },
    }),

    // 🔹 Обновление корзины пользователя
    updateCart: builder.mutation({
      queryFn: async ({ userId, cart }) => {
        const { error } = await supbase
          .from("users")
          .update({ cart })
          .eq("id", userId);
        if (error) console.log(error);
        return { data: "Cart updated successfully" };
      },
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateCartMutation,
} = userApi;
