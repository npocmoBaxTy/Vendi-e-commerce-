import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FC, ReactNode } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

interface IAccordion {
  title: string;
  children?: ReactNode;
  arrow: boolean;
  isDefault?: boolean;
}

const Accordion: FC<IAccordion> = ({
  title,
  children,
  arrow,
  isDefault = false,
}) => {
  return (
    <>
      <Disclosure as="div" className="py-2" defaultOpen={isDefault}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="text-md font-medium text-gray-600">{title}</span>
          {!arrow ? (
            <GoPlus className="size-5 fill-black group-data-[open]:rotate-30" />
          ) : (
            <IoIosArrowDown className="size-5 fill-black group-data-[open]:rotate-180" />
          )}
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm text-gray-700">
          {children}
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};

export default Accordion;
