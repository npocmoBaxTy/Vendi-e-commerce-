import { LuMoveRight } from "react-icons/lu";
import IComment from "../../models/Comment";
import Comment from "../../shared/Comment/Comment";
import SimpleSlider from "../Slider/Slider";
import { useRef } from "react";
import Slider from "react-slick";

const HomePageComments = ({ comments }: { comments: IComment[] }) => {
  const sliderRef = useRef<Slider | null>(null);
  return (
    <div className="home__page--comments pb-5">
      <div className="home__page--comments_title flex items-center justify-between">
        <h1 className="text-xl text-gray-700 mb-3">Our Commentaries</h1>
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
      <SimpleSlider slidesToShow={2} ref={sliderRef}>
        {comments?.map((item) => {
          return <Comment comment={item} />;
        })}
      </SimpleSlider>
    </div>
  );
};

export default HomePageComments;
