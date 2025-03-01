import { NavLink } from "react-router-dom";
import { LuMoveRight } from "react-icons/lu";

const Banner = ({ img }: { img: string }) => {
  return (
    <div className="main__page--banner rounded flex flex-col-reverse sm:flex-row items-center justify-around w-full sm:p-10 p-5 bg-gray-100">
      <div className="banner-description text-center sm:text-left sm:w-auto w-[70%] pl-1 h-full flex flex-col justify-center">
        <h1 className="sm:text-4xl mb-1 text-xl font-bold">
          Classic Exclusive
        </h1>
        <p className="sm:text-xl text-sm">Women's Collection</p>
        <NavLink
          to={"/products"}
          className="banner--link bg-main p-2 mt-2 text-white text-center rounded-md flex items-center justify-center gap-2"
        >
          <span>Shop Now</span>
          <LuMoveRight />
        </NavLink>
      </div>
      <div className="banner--img">
        <img src={`${img}`} className="sm:size-96 size-48" alt="banner--img" />
      </div>
    </div>
  );
};

export default Banner;
