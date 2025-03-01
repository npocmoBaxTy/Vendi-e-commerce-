import SimpleSlider from "../Slider/Slider";
import shirt from "./../../assets/shirt.png";
import pans from "./../../assets/pans.png";
import dress from "./../../assets/dress.png";
import furniture from "./../../assets/pngwing.com.png";
import laptop from "./../../assets/laptop.png";
import { useRef } from "react";
import Slider from "react-slick";
import { LuMoveRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const ByCategory = () => {
  const sliderRef = useRef<Slider | null>(null);

  const categories = [
    {
      title: "T-Shirts",
      image: shirt,
    },
    {
      title: "Laptops",
      image: laptop,
    },
    {
      title: "Pants",
      image: pans,
    },
    {
      title: "Dresses",
      image: dress,
    },
    {
      title: "Furniture",
      image: furniture,
    },
  ];

  return (
    <section className="shop--by__category py-5">
      <div className="by__category--title mb-3 flex items-center justify-between">
        <h2 className="text-[#27252b] text-lg sm:text-xl font-semibold">
          Shop by Categories
        </h2>
        <div className="slider__btns">
          <button
            className="slider__btn prev cursor-pointer bg-[#111] mr-2 text-white p-1 text-sm px-2 rounded"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <LuMoveRight className="rotate-180" />
          </button>
          <button
            className="slider__btn next cursor-pointer bg-[#111] text-white p-1 text-sm px-2 rounded"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <LuMoveRight />
          </button>
        </div>
      </div>
      <div className="list p-2">
        <SimpleSlider slidesToShow={5} ref={sliderRef}>
          {categories.map((category, index) => (
            <div
              key={`${index}--div--${category}`}
              className="text-center p-1 "
            >
              <div className="inner border relative overflow-hidden border-gray-100 rounded-md p-3 bg-[#f3f3f3]">
                <span className="category--title sigmar--font absolute w-full text-nowrap z-10 left-0 -top-2 sm:text-8xl text-6xl text-zinc-300">
                  {category.title}
                </span>
                <img
                  src={category.image}
                  className="sm:size-48 z-20 relative size-36 mx-auto mb-2"
                  alt={category.title}
                />
                <NavLink
                  to={`/categories/${category.title}`}
                  className={
                    "py-1 px-2 w-[90%] mx-auto flex items-center gap-2 justify-center bg-[#111] text-white rounded text-sm uppercase"
                  }
                >
                  Discover
                  <LuMoveRight />
                </NavLink>
              </div>
            </div>
          ))}
        </SimpleSlider>
      </div>
    </section>
  );
};

export default ByCategory;
