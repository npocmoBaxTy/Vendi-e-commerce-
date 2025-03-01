import { useEffect, useRef, useState } from "react";
import IProduct from "../../models/Product";
import { fetchProductsData } from "../../utils/api";
import Card from "../../shared/Card/Card";
import Slider from "react-slick";
import SimpleSlider from "../Slider/Slider";
import { LuMoveRight } from "react-icons/lu";

const Releated = ({ product }: { product?: IProduct }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const sliderRef = useRef<Slider | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchProductsData();
      setProducts(res.data.products);
    };
    fetchData();
  }, [product]);
  return (
    <div className="releated__products">
      <div className="releated__products--header flex items-center w-full justify-between">
        <h2 className="releated__Products__title text-gray-700 text-2xl">
          Related Products
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
      <div className="releate__products--list w-full">
        {product && (
          <SimpleSlider ref={sliderRef} slidesToShow={4}>
            {products
              .filter((item) => item.category === product?.category)
              .map((item) => {
                return (
                  <Card
                    product={item}
                    view="grid"
                    classname="slider--product--card"
                  />
                );
              })}
          </SimpleSlider>
        )}
      </div>
    </div>
  );
};

export default Releated;
