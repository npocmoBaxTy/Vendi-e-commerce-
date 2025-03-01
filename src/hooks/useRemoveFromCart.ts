import { useState } from "react";
import { useAppSelector } from "../Store/hooks";
import { toast } from "react-toastify";
import useRegUser from "./useRegUser";

const useRemoveFromCart = () => {
  const curUser = useAppSelector((state) => state.user.user);
  const [cart, setCart] = useState<number[]>([]);
  const { updateUserCart } = useRegUser();
  const [deleting, setDeleting] = useState<boolean>(false);

  const removeFromCartHandler = (productId: number) => {
    if (curUser && curUser.id) {
      try {
        setDeleting(true);
        const newCart = [...(curUser.cart || [])];
        const index = newCart.indexOf(productId);
        newCart.splice(index, 1);
        setCart(newCart);
        updateUserCart(newCart, curUser.id);
      } catch (e) {
        toast.error("Something went wrong!");
      } finally {
        setDeleting(false);
      }
    } else {
      toast.warning("No user logged in to remove product from cart");
      return;
    }
  };

  return { removeFromCartHandler, cart, deleting };
};

export default useRemoveFromCart;
