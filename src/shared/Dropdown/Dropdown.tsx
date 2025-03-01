import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { FC, ReactNode, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface IProps {
  title: string;
  children: ReactNode;
}

const DropDown: FC<IProps> = ({ title, children }) => {
  const [newTitle, setNewTitle] = useState<string>(title);

  const clickHandler = (e: any) => {
    setNewTitle(e.target.innerText);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center gap-0 rounded-md bg-white  text-gray-900 hover:text-[#f22735]">
          {newTitle}
          <IoIosArrowDown aria-hidden="true" className="text-gray-800" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute -right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div onClick={clickHandler} className="py-1">
          {children}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropDown;
