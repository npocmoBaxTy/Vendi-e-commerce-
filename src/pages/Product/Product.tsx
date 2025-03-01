import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchCommentsData, fetchProductDetails } from "../../utils/api";
import IProduct from "../../models/Product";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TiStarFullOutline } from "react-icons/ti";
import { LiaDollarSignSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import TabsGroup from "../../shared/TabsGroup/TabsGroup";
import IComment from "../../models/Comment";
import Comment from "../../shared/Comment/Comment";
import Releated from "../../components/Releated/Releated";
import useUpdateToCart from "../../hooks/useAddtoCart";
import useRegUser from "../../hooks/useRegUser";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader/Loader";
import "./Product.css";
const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();
  const [commentaires, setCommentaires] = useState<IComment[]>([]);
  const curUser = useRegUser();
  const [count, setCount] = useState<number>(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      const res = await fetchProductDetails(Number(id));
      setProduct(res.data);
    };
    fetchProduct();
    const fetchComments = async () => {
      const res = await fetchCommentsData();
      setCommentaires(res.comments);
    };
    fetchComments();
  }, [id]);

  const { addToCart } = useUpdateToCart();

  const addToCartHandler = () => {
    if (!curUser) {
      toast.warning("You need to be logged in to add items to your cart.");
      return;
    }
    if (product) {
      try {
        addToCart(product.id.toString());
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  const tabs = [
    {
      label: "Description",
      content: product?.description,
    },
    {
      label: "Reviews",
      content: commentaires
        .slice(0, 5)
        .map((comment) => <Comment comment={comment} />),
    },
  ];

  const sizes = [
    {
      title: "S",
      count: 15,
    },
    {
      title: "M",
      count: 20,
    },
    {
      title: "L",
      count: 34,
    },
    {
      title: "XL",
      count: 15,
    },
    {
      title: "XXL",
      count: 10,
    },
    {
      title: "XXXL",
      count: 12,
    },
  ];
  return (
    <div className="product__details--page px-2 py-10">
      {/* Breadcrumbs */}
      <div className="breadcrumbs relative z-20 flex items-center text-sm gap-1 text-gray-500">
        <NavLink className={"underline"} to="/">
          Home
        </NavLink>
        <span>
          <MdOutlineKeyboardArrowRight />
        </span>
        <NavLink className={"underline"} to="/products">
          Products
        </NavLink>
        <span>
          <MdOutlineKeyboardArrowRight />
        </span>
        <span className="text-[#111]">{product?.id}</span>
      </div>
      <div className="product__details flex items-start flex-wrap sm:flex-nowrap">
        {/* Product Images */}
        <div className="product__details--images relative z-10 flex flex-col items-center w-full sm:w-[49%] md:w-full lg:w-[49%] xl:w-[49%]">
          <div className="images__main--image">
            <LazyLoadImage
              src={product?.images[0]}
              className="w-full sm:size-96"
              effect="blur"
            />
          </div>
          <div className="images__thumbnail--images flex items-center gap-1 sm:gap-3">
            {Array.from([1, 2, 3, 4]).map((item) => (
              <div
                key={`thumbnail--image--${item}`}
                className="image__thumbnail--image bg-[#fafafb] duration-300 hover:scale-105 cursor-pointer p-2 rounded border border-gray-300"
              >
                <LazyLoadImage
                  key={item}
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="sm:size-20 size-16"
                  effect="blur"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product info and options */}
        <div className="product__details--info sm:w-[55%] mt-3 sm:mt-0">
          {/* Header */}
          <div className="product__info--header flex flex-col gap-1">
            <div className="product__info--header-title flex items-center flex-wrap">
              <h1 className="sm:text-3xl inline-block text-lg font-bold mr-2">
                {product?.title}
              </h1>
              <span className="inline-block sm:ml-auto text-sm py-1 px-3 bg-green-100 rounded text-green-700">
                {product?.availabilityStatus}
              </span>
              <span className="block w-full text-sm sm:text-[16px] text-gray-900 my-2 md:my-2 xl:my-0 lg:my-0 sm:my-0">
                {product?.brand}
              </span>
            </div>
            <div className="rating flex items-center gap-1 mt-0.5">
              <div className="rating--stars flex items-center gap-1 text-lg">
                {[1, 2, 3, 4, 5].map((item) => (
                  <span key={`${item}--rating--star`}>
                    <TiStarFullOutline className="text-yellow-500" />
                  </span>
                ))}
              </div>
              <div className="rating--views text-sm text-gray-400">
                <span className="mr-1 text-gray-700">{product?.rating}</span>(
                {product?.reviews.length} Reviews)
              </div>
            </div>
            <div className="product__info--price my-3 flex items-center font-semibold text-[16px]">
              <span>
                <LiaDollarSignSolid />
              </span>
              <span>{product?.price}</span>
              <span className="text-gray-400 flex items-center text-sm ml-1 line-through">
                <LiaDollarSignSolid />
                300
              </span>
            </div>
          </div>
          <div className="product__info--content">
            <div className="product__info--desc text-sm my-3 text-gray-800">
              {product?.description}
            </div>
            <div className="product__info--tags">
              <h3 className=" font-semibold mb-2">Tags</h3>
              {product?.tags.map((tag) => (
                <NavLink
                  to={"/products/tags/" + tag}
                  key={`${tag}`}
                  className="badge mr-2 bg-gray-100 text-gray-700 px-2 py-1 text-sm rounded"
                >
                  #{tag}
                </NavLink>
              ))}
            </div>
            <div className="product__info--stock mt-4 flex items-center gap-4">
              <div className="stock--info">
                <h3 className="font-semibold">Stock</h3>
                <span className="flex items-center">
                  <BsBoxSeam className="text-gray-700" />
                  {product?.stock}
                </span>
              </div>
              <div className="order--quantity">
                <h3 className="font-semibold">Minimum Order Quantity</h3>
                <span className="text-gray-500 flex items-center gap-1">
                  <FaTruckFast />(
                  {product?.minimumOrederQuantity
                    ? product?.minimumOrederQuantity
                    : "No limit"}
                  )
                </span>
              </div>
            </div>
            <div className="product__size mt-3">
              <h3 className="mb-2 font-semibold text-lg">Size</h3>
              <div className="product__size-items flex items-center gap-3">
                {sizes.map((item) => (
                  <button
                    key={item.title}
                    className={`size--button bg-white text-[#111] border border-[#111] px-3 py-1 text-sm rounded duration-300 hover:text-white hover:bg-[#111] cursor-pointer`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="product__info--footer">
            <div className="product__options mt-5 flex items-stretch gap-3">
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
              <div className="add__to__cart w-1/2">
                <button
                  onClick={addToCartHandler}
                  className="add--to--cart-button h-full flex items-center justify-center w-full cursor-pointer bg-[#111] text-white text-sm font-semibold rounded-lg px-4 py-2 border"
                >
                  {curUser ? "Add to Cart" : <Loader />}
                </button>
              </div>
              <div className="like__it">
                <button className="like--it-button h-full block w-full cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded-lg px-4 py-2 border">
                  <AiOutlineHeart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__details--tabs my-10">
        <TabsGroup tabs={tabs} />
      </div>
      <Releated product={product} />
    </div>
  );
};

export default Product;
