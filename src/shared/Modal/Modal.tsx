import { Dialog, DialogPanel } from "@headlessui/react";
import { FC, ReactNode } from "react";

interface IMyModal {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

const MyModal: FC<IMyModal> = ({ isOpen, close, children }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MyModal;
