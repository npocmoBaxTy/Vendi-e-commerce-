import { useEffect, useState } from "react";
import Loader from "../../shared/Loader/Loader";
import IProduct from "../../models/Product";
import { fetchProductsData } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { LiaDollarSignSolid } from "react-icons/lia";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import CustomInput from "../../shared/Input/Input";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import { useAppSelector } from "../../Store/hooks";
const Cart = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [userProducts, setUserProducts] = useState<IProduct[]>([]);
  const [count, setCount] = useState<number>(1);
  const [code, setCode] = useState<string>("FLAT50");
  const { removeFromCartHandler, deleting } = useRemoveFromCart();
  const curUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (curUser) {
      setCart([...(curUser?.cart || [])]);
    }
    const fetchData = async () => {
      const res = await fetchProductsData();
      setProducts(res.data.products);
    };
    fetchData();
  }, [curUser]);
  useEffect(() => {
    const arr = cart
      .map((id) => products.find((product) => product.id === id))
      .filter((product) => product !== undefined);
    setUserProducts(arr);
  }, [cart, products]);

  const deleteProductHandler = (productId: number) => {
    const index = cart.indexOf(productId);
    setCart((prev) => {
      const newCart = [...prev]; // Создаем копию массива
      newCart.splice(index, 1); // Удаляем элемент из копии
      return newCart; // Возвращаем обновленный массив
    });
    removeFromCartHandler(productId);
  };

  return (
    <div className="cart__container">
      <div className="cart__container p-2 flex flex-wrap justify-between items-start">
        <div className="cart__container--title text-3xl py-3 w-full">
          CheckOut
        </div>
        <div className="cart__items-table overflow-x-scroll sm:overflow-hidden flex flex-col py-6 w-full md:w-full lg:w-[65%] xl:w-[65%] sm:w-[65%]">
          {/* Table columns title */}
          <div className="cart__items--table-header flex items-center font-semibold border-b border-gray-300 w-full justify-between">
            <div className="cart__items--table-header-cell w-[30%] ">
              Product
            </div>
            <div className="cart__items--table-header-cell ">Price</div>
            <div className="cart__items--table-header-cell hidden sm:block xl:block lg:block md:hidden">
              Quantity
            </div>
            <div className="cart__items--table-header-cell ">Total</div>
            <div className="cart__items--table-header-cell ">{``}</div>
          </div>
          {/* Table Products */}
          <div className="cart__items--table-content w-full">
            <div className="products__columns--items flex flex-col-reverse mt-3">
              {curUser ? (
                userProducts.map((item) => {
                  return (
                    <div className="products__column--card border-b border-gray-300 py-3 flex items-stretch w-full justify-between">
                      <div className="products__card--image flex-col sm:flex-row lg:flex xl:flex items-start w-[30%]">
                        <div className="w-16 bg-[#fbfafb] rounded-lg">
                          <LazyLoadImage
                            src={item.images[0]}
                            effect="blur"
                            className="w-full"
                          />
                        </div>

                        <div className="products__card--title m-0 md:m-0 xl:ml-3 lg:ml-3 sm:ml-3 flex flex-col">
                          <span className="font-semibold text-[16px]">
                            {item.title}
                          </span>
                          <span className="mt-3 hidden sm:block xl:block lg:block md:hidden">
                            Category:{" "}
                            <NavLink
                              className={"underline"}
                              to={"/products/category/" + item.category}
                            >
                              {item.category}
                            </NavLink>
                          </span>
                        </div>
                      </div>
                      <div className="products__card--price">
                        <span className="flex items-center font-semibold py-6">
                          <LiaDollarSignSolid />
                          {item.price}
                        </span>
                      </div>
                      <div className="products__card--quantity pt-6 hidden sm:block xl:block lg:block md:hidden">
                        <div className="options__quantity border inline-flex rounded-lg border-gray-600 items-center text-sm">
                          <div
                            className="discrement p-2 cursor-pointer"
                            onClick={() => {
                              if (count === 1) {
                                return;
                              }
                              setCount(count - 1);
                            }}
                          >
                            <FiMinus />
                          </div>
                          <div className="count p-2">{count}</div>
                          <div
                            onClick={() => setCount(count + 1)}
                            className="increment p-2 cursor-pointer"
                          >
                            <FiPlus />
                          </div>
                        </div>
                      </div>
                      <div className="products__card-total pt-6">
                        <span className="flex items-center font-semibold">
                          <LiaDollarSignSolid />
                          {Math.ceil(item.price * count)}
                        </span>
                      </div>
                      <div className="products__card-delete pt-6">
                        {deleting ? (
                          <Loader />
                        ) : (
                          <button
                            onClick={() => deleteProductHandler(item.id)}
                            type="button"
                            className="text-red-400 cursor-pointer"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <Loader />
              )}
              {userProducts.length === 0 && curUser && (
                <div>
                  No Products added! Go{" "}
                  <NavLink
                    className={"underline text-blue-500"}
                    to={"/products"}
                  >
                    Shopping!
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Subtotal */}
        <div className="cart__container--total px-3 flex flex-col border border-gray-300 w-full  md:w-full lg:w-[29%] xl:w-[29%] sm:w-[29%]">
          <div className="subtotal__title p-3 border-b border-gray-300 flex items-center justify-between w-full font-semibold">
            <span>Subtotal</span>
            <span className="inline-flex items-center font-normal">
              <LiaDollarSignSolid />
              {userProducts.reduce(
                (total, item) => Math.ceil(total + Number(item.price)),
                0
              )}
            </span>
          </div>
          <div className="promocode--input pt-3 flex items-center justify-start">
            <CustomInput
              type="text"
              value={code}
              changeHandler={(e) => setCode(e.target.value)}
              placeholder="FLAT50"
              label="Enter discount code"
              className="py-3 w-full text-xl rounded-none rounded-l-md"
            />
            <button
              type="button"
              className="bg-[#111] border border-[#111] px-2 text-white py-3 mt-auto text-lg cursor-pointer rounded-r-md"
            >
              Apply
            </button>
          </div>
          <div className="delivery-charge py-3">
            <div className="delivery-charge__title p-3 border-b border-gray-300 flex items-center justify-between w-full">
              <span>Delivery Charge</span>
              <span className="inline-flex items-center">
                <LiaDollarSignSolid />5
              </span>
            </div>
          </div>
          <div className="grand-total">
            <div className="grand-total__title p-3 border-b border-gray-300 flex items-center justify-between w-full font-semibold">
              <span>Grand Total</span>
              <span className="inline-flex items-center font-normal">
                <LiaDollarSignSolid />
                {Math.ceil(
                  userProducts.reduce(
                    (total, item) => Math.ceil(total + Number(item.price)),
                    0
                  ) - 5
                )}
              </span>
            </div>
          </div>
          <div className="proceed-checkout--btn py-3 text-center">
            <button
              type="button"
              className="bg-[#111] w-full border border-[#111] p-3 text-white text-lg cursor-pointer rounded-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
