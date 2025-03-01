import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC, ReactNode } from "react";
import "./Slider.css";

interface ISlider {
  children: ReactNode;
  slidesToShow: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  ref?: any;
}

const SimpleSlider: FC<ISlider> = ({ children, ref, slidesToShow }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    className: "slider-cards",
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings} ref={ref}>
        {children}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
