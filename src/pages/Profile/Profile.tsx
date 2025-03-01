import { FaUserAstronaut } from "react-icons/fa";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import PersonalInformation from "../../components/Personal/Personal";
import { useAppSelector } from "../../Store/hooks";
import { IoLogOutOutline } from "react-icons/io5";
import useRegUser from "../../hooks/useRegUser";
import MyModal from "../../shared/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const curUser = useAppSelector((state) => state.user.user);
  const tabs = [
    {
      label: "Personal Information",
      content: <PersonalInformation user={curUser || null} />,
    },
    {
      label: "My Orders",
      content: "",
    },
    {
      label: "My Wishlist",
      content: "",
    },
    {
      label: "Manage Addresses",
      content: "",
    },
    {
      label: "Saved Cards",
      content: "",
    },
    {
      label: "Notifications",
      content: "",
    },
    {
      label: "Settings",
      content: "",
    },
  ];
  const { signOutUser } = useRegUser();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    window.localStorage.clear();
    navigate("/login");
    await signOutUser();
    console.log("dispatched");
    setShow(false);
  };
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="profile--wrapper py-10 px-2">
      <MyModal close={() => setShow(false)} isOpen={show}>
        <div className="modal__content px-5 py-4">
          <h2 className="modal__title text-lg">Log Out</h2>
          <p className="modal__text text-gray-600">
            Are you sure you want to log out? Your current session will be
            terminated.
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="btn btn--cancel cursor-pointer"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <div
              onClick={signOutHandler}
              className="profile--tabs__divider flex items-center justify-center gap-1 cursor-pointer"
            >
              <IoLogOutOutline className="text-red-400" /> Logout
            </div>
          </div>
        </div>
      </MyModal>
      <div className="profile--wrapper-title">
        <h1 className="text-xl py-5">My Profile</h1>
      </div>
      <div className="profile--wrapper__content">
        <TabGroup
          className={
            "profile--tabs__group flex flex-col xl:flex-row lg:flex-row"
          }
        >
          <div className="profile--tabs__list p-3 xl:p-7 lg:p-7 border border-gray-300 w-full lg:w-fit xl:w-fit">
            <div className="user--info flex pb-6 justify-center xl:justify-start md:justify-center items-center gap-2">
              <div className="profile__img p-2 rounded-full bg-[#111] text-white text-2xl">
                <FaUserAstronaut />
              </div>
              <div className="profile__name">
                <span>Hello</span>
                <div>
                  <span>{curUser?.first_name}</span>
                  <span>{curUser?.last_name}</span>
                </div>
              </div>
            </div>
            <TabList
              className={
                "mb-5 text-nowrap tabs-list flex flex-row xl:flex-col lg:flex-col overflow-x-scroll xl:overflow-hidden"
              }
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={
                    "p-3 border-[#111] w-full rounded data-[selected]:bg-[#111] data-[selected]:text-white mr-3 outline-none"
                  }
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>
            <div
              onClick={() => setShow(true)}
              className="profile--tabs__divider flex items-center justify-center gap-1 cursor-pointer"
            >
              <IoLogOutOutline className="text-red-400" /> Logout
            </div>
          </div>
          <div className="profile--tabs__panels">
            <TabPanels>
              {tabs.map((tab, index) => (
                <TabPanel key={index} className="p-3">
                  {tab.content}
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
};

export default Profile;
