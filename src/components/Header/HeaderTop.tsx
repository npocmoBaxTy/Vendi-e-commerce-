import Logo from "../Logo/Logo";
import "./Header.css";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from "../../Store/hooks";
const HeaderTop = () => {
  const curUser = useAppSelector((state) => state.user.user);
  return (
    <div className="header__inner-top flex items-center border-b border-b-gray-300 pb-5 sm:pb-5 w-full justify-between sm:text-xl text-lg">
      <div className="social__list flex items-center gap-2 ">
        <a href="#">
          <FaSquareTwitter className="social__icon" />
        </a>
        <a href="#">
          <FaInstagramSquare className="social__icon" />
        </a>
        <a href="#">
          <FaTelegram className="social__icon" />
        </a>
      </div>
      <Logo />
      <div className="header__top--options text-xl flex items-center gap-2 main-text">
        <NavLink to={"/search"} type="button" className="cursor-pointer">
          <CiSearch />
        </NavLink>
        {curUser ? (
          <NavLink to={"/profile"}>
            <CiUser />
          </NavLink>
        ) : (
          <NavLink to={"/login"} className={"text-sm"}>
            Login
          </NavLink>
        )}
        <NavLink className={"block relative"} to={"/profile/cart"}>
          {curUser && (
            <span className="absolute block w-4 h-4 text-xs text-center rounded-full bg-yellow-500 text-white right-2 top-1/2">
              {curUser?.cart?.length}
            </span>
          )}
          <IoCart />
        </NavLink>
      </div>
    </div>
  );
};
export default HeaderTop;
