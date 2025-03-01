import { useState } from "react";
import useRegUser from "./useRegUser";
import { toast } from "react-toastify";
import { useAppSelector } from "../Store/hooks";

const useUpdateToCart = () => {
  const { updateUserCart } = useRegUser();
  const curUser = useAppSelector((state) => state.user.user);
  const [cart, setCart] = useState<number[]>([]);
  const [adding, setAdding] = useState<boolean>(false);

  const addToCart = (productId: string) => {
    if (curUser && curUser.id) {
      try {
        setAdding(true);
        const newCart = [...(curUser?.cart || []), Number(productId)];
        setCart(newCart);
        updateUserCart(newCart, curUser.id);
        toast.success("Cart updated successfully!");
      } catch (err) {
        toast.error("An error occurred while updating your cart.");
      } finally {
        setAdding(false);
      }
    } else {
      toast.warning("You need to be logged in to add items to your cart.");
    }
  };

  return { addToCart, cart, adding };
};

export default useUpdateToCart;
