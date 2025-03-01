import { NavLink } from "react-router-dom";
import i from "./../../assets/logo.svg";

const Logo = () => {
  return (
    <div className="site__logo">
      <NavLink to={"/"} className={"site__logo--link flex items-center gap-1"}>
        <img src={i} alt="site logo" className="size-10" />
        <span className="font-medium main-text hidden sm:inline-block">
          Vendi
        </span>
      </NavLink>
    </div>
  );
};

export default Logo;
