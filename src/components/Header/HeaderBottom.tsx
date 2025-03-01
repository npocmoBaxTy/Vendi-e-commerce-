import { NavLink } from "react-router-dom";
import "./Header.css";
import DropDown from "../../shared/Dropdown/Dropdown";

const HeaderBottom = () => {
  return (
    <div className="header__inner--bottom text-sm sm:text-[14px] p-2 pt-3 font-medium flex justify-center">
      <div className="header__bottom--list flex items-center gap-4">
        <NavLink to={"/"}>Home</NavLink>
        <DropDown title="Shop">
          {["Shop", "Shop2"].map((item) => (
            <NavLink
              key={`${item}--header--dropdown`}
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              to={`/shop/${item.toLowerCase()}`}
            >
              {item}
            </NavLink>
          ))}
        </DropDown>
        <NavLink to={"/products"}>Products </NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </div>
    </div>
  );
};

export default HeaderBottom;
