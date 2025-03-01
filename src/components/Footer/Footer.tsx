import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="footer p-4 bg-[#111] text-white">
      <div className="footer__inner py-5 px-2 sm:p-5 flex-wrap sm:flex-nowrap justify-center flex items-center sm:justify-between gap-3">
        <div className="p-3 bg-white rounded-lg">
          <Logo />
        </div>
        <ul className="footer__list flex items-center gap-3">
          <li>
            <a href="#" className="text-sm">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="text-sm">
              Terms
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
