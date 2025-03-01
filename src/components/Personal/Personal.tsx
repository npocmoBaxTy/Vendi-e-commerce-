import { IUser } from "../../models/IUser";
import "./Personal.css";

const PersonalInformation = ({ user }: { user: IUser | null }) => {
  return (
    <div className="personal-information__wrapper w-full">
      <div className="user__firstname">
        <span className="mr-2 text-gray-700 text-lg">Your Firstname:</span>
        <span>{user?.first_name}</span>
      </div>
      <div className="user__lastname">
        <span className="mr-2 text-gray-700 text-lg">Your Lastname:</span>
        <span>{user?.last_name}</span>
      </div>
      <div className="user__email">
        <span className="mr-2 text-gray-700 text-lg">Your Email:</span>
        <span>{user?.email}</span>
      </div>
      <div className="user__phone">
        <span className="mr-2 text-gray-700 text-lg">Your Username:</span>
        <span>{user?.username}</span>
      </div>
    </div>
  );
};

export default PersonalInformation;
