import { FC } from "react";
import Accordion from "../../shared/Accordion/Accordion";
import { NavLink } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./Filters.css";
import CheckInput from "../../shared/CheckInput/CheckInput";
import { IoMdClose } from "react-icons/io";

interface IFilters {
  categories: string[];
  filterByPriceHandle: (newPrice: number[]) => void;
  price: number[];
  confirmFiltersHandler: () => void;
  handleCheckInputChange: (category: string, isChecked: boolean) => void;
}

const Filters: FC<IFilters> = ({
  categories,
  filterByPriceHandle,
  price,
  confirmFiltersHandler,
  handleCheckInputChange,
}) => {
  const colors = [
    {
      title: "Red",
      color: "#f22735",
      count: 10,
    },
    {
      title: "Blue",
      color: "#1e90ff",
      count: 8,
    },
    {
      title: "Green",
      color: "#32cd32",
      count: 12,
    },
    {
      title: "Yellow",
      color: "#ffd700",
      count: 5,
    },
    {
      title: "Purple",
      color: "#800080",
      count: 7,
    },
    {
      title: "Black",
      color: "#000000",
      count: 15,
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
  const handleOpen = () => {
    document.querySelector(".filters")?.classList.toggle("open");
  };

  return (
    <div className="filters flex flex-col duration-300 w-[25%] lg:w-[30%] p-6 gap-2">
      <div
        className="fixed right-2 md:block sm:hidden lg:hidden"
        onClick={handleOpen}
      >
        <IoMdClose />
      </div>
      <div className="filters__inner">
        <Accordion title="Product Categories" arrow={true} isDefault={true}>
          <Accordion title="Mens" arrow={false}>
            <ul className="flex flex-col">
              {categories.map((category) => (
                <div className="flex items-center gap-2" key={category}>
                  <CheckInput
                    onChange={(isChecked) =>
                      handleCheckInputChange(category, isChecked)
                    }
                  />
                  <NavLink
                    to={`/categories/${category}`}
                    className={"py-1 duration-300 hover:text-[#f22735]"}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                </div>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Womens" arrow={false}>
            <ul className="flex flex-col">
              {categories.slice(4).map((category, index) => (
                <div
                  key={`${category}--${index}`}
                  className="flex items-center gap-2"
                >
                  <CheckInput
                    onChange={(isChecked) =>
                      handleCheckInputChange(category, isChecked)
                    }
                  />
                  <NavLink
                    to={`/categories/${category}`}
                    className={"py-1 duration-300 hover:text-[#f22735]"}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                </div>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Kids" arrow={false}>
            <ul className="flex flex-col">
              {categories.slice(7, 20).map((category) => (
                <div
                  key={`${category}__${category[0]}`}
                  className="flex items-center gap-2"
                >
                  <CheckInput
                    onChange={(isChecked) =>
                      handleCheckInputChange(category, isChecked)
                    }
                  />
                  <NavLink
                    to={`/categories/${category}`}
                    className={"py-1 duration-300 hover:text-[#f22735]"}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                </div>
              ))}
            </ul>
          </Accordion>
          <ul className="filters__list flex flex-col">
            {categories.slice(10, 19).map((category) => (
              <li
                key={`${category}--li--${category[3]}`}
                className="filters__list--item py-1 flex items-center gap-2"
              >
                <CheckInput
                  onChange={(isChecked) =>
                    handleCheckInputChange(category, isChecked)
                  }
                />
                <NavLink
                  to={`/categories/${category}`}
                  className={
                    " duration-300 hover:text-[#f22735] text-md font-medium text-gray-600"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Filter By Price" arrow={true} isDefault={true}>
          <div className="flex items-center mb-4 text-sm">
            <span className="font-semibold text-gray-600 mr-1">Price:</span>
            <span className="mr-2">{price[0]}$</span>
            <span>-</span>
            <span className="ml-2">{price[1]}$</span>
          </div>
          <RangeSlider
            onInput={filterByPriceHandle}
            min={0}
            max={100000}
            defaultValue={[price[0], price[1]]}
            step={100}
          />
        </Accordion>
        <Accordion title="Filter By Colors" arrow={true} isDefault={true}>
          {colors.map(({ title, color, count }) => (
            <NavLink
              to={"/search?query=" + title.toLowerCase()}
              className="flex items-center gap-2 mb-4 text-sm hover:underline"
              key={`${title}--color--${color}`}
            >
              <div
                className={`filters__color-box w-6 h-6 rounded-md`}
                style={{ backgroundColor: `${color}` }}
              ></div>
              <span className="text-gray-600">{title}</span>
              <span className="ml-auto text-gray-500">({count})</span>
            </NavLink>
          ))}
        </Accordion>
        <Accordion title="Filter By Size" arrow={true} isDefault={true}>
          {sizes.map((size) => (
            <NavLink
              to={"/search?size=" + size.title}
              className="flex items-center gap-2 mb-4 text-sm hover:underline"
              key={size.title}
            >
              <CheckInput
                onChange={(isChecked) =>
                  handleCheckInputChange(size.title, isChecked)
                }
              />
              <span className="filters__size-text text-gray-600">
                {size.title}
              </span>
              <span className="block ml-auto">({size.count})</span>
            </NavLink>
          ))}
        </Accordion>
        <div className="confirm__filters">
          <button
            onClick={confirmFiltersHandler}
            className="px-3 py-2 bg-[#111] border border-[#111] cursor-pointer text-white rounded duration-300 hover:bg-white hover:text-[#111]"
          >
            Confirm Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
