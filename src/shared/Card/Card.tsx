import { CgArrowsExchange } from "react-icons/cg";
import { FaStar } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { PiStar } from "react-icons/pi";
import IProduct from "../../models/Product";
import "./Card.css";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FC } from "react";
import useUpdateToCart from "../../hooks/useAddtoCart";
import { useAppSelector } from "../../Store/hooks";
import Loader from "../Loader/Loader";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";

interface ICard {
  product: IProduct;
  view: string;
  classname?: string;
}

const Card: FC<ICard> = ({ product, view, classname }) => {
  const { addToCart, adding } = useUpdateToCart();
  const { deleting, removeFromCartHandler } = useRemoveFromCart();
  const user = useAppSelector((state) => state.user.user);
  const addToCartHandler = () => {
    if (product) {
      try {
        addToCart(product.id.toString());
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  return (
    <div
      key={`${product.id}--${product.title}`}
      className={`product--card flex flex-col items-center p-2 mb-4 ${classname} ${
        view === "row" && "row--card"
      }`}
    >
      <div className="bg-[#fafafb] relative p-3 w-full flex justify-center rounded overflow-hidden">
        <LazyLoadImage
          src={product.images[0]}
          className="best--sellers__item-image h-40 sm:h-60 sm:w-48"
          effect="blur"
        />
        <div className="card__display duration-200 opacity-0 flex flex-col justify-between absolute left-0 top-0 w-full h-full bg-black/30">
          <div className="card__display--options w-full mt-2 pr-2 items-end flex flex-col gap-1 sm:gap-3 sm:text-xl">
            <span className="bg-white p-2 rounded-full cursor-pointer hover:bg-[#111] hover:text-white">
              <PiStar />
            </span>
            <span className="bg-white p-2 rounded-full cursor-pointer hover:bg-[#111] hover:text-white">
              <CgArrowsExchange />
            </span>
            <NavLink
              to={`/products/product/${product.id}`}
              className="bg-white p-2 rounded-full cursor-pointer hover:bg-[#111] hover:text-white"
            >
              <FiEye />
            </NavLink>
          </div>
          {user?.cart?.includes(product.id) ? (
            <button
              onClick={() => removeFromCartHandler(product.id)}
              className="card__display-button text-center cursor-pointer hover:bg-[#111] hover:text-white w-[80%] mx-auto mb-2 bg-[#f22735] text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              {deleting ? <Loader /> : "Remove from Cart"}
            </button>
          ) : (
            <button
              onClick={addToCartHandler}
              className="card__display-button flex justify-center text-center cursor-pointer hover:bg-[#111] hover:text-white w-[80%] mx-auto mb-2 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-md"
            >
              {adding ? <Loader /> : "Add to cart"}
            </button>
          )}
        </div>
      </div>
      <div className="info py-2 text-left w-full">
        <div className="best--sellers__item-title mb-2 flex flex-col text-gray-800 font-semibold text-sm sm:text-[14px]">
          <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">
            {product.title}
          </h2>
          <span className="text-ellipsis whitespace-nowrap overflow-hidden text-gray-500 text-sm pr-1">
            {product.description}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="best--sellers__item-price text-gray-600">
            ${product.price}
          </p>
          <span className="text-gray-500 inline-flex items-center gap-1 text-sm">
            {product.rating}
            <FaStar className="text-yellow-400" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
