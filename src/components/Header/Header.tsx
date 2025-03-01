import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

const Header = () => {
  return (
    <header className="header bg-white py-5 px-2 sm:p-5">
      <div className="header__inner">
        <HeaderTop />
        <HeaderBottom />
      </div>
    </header>
  );
};

export default Header;
