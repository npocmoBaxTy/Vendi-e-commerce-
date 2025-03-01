import { useState } from "react";
import CustomInput from "../../shared/Input/Input";
import i from "./../../assets/undraw_welcome-cats_tw36.png";
import "./Signup.css";
import useRegUser from "../../hooks/useRegUser";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { addUser } = useRegUser();

  const regUserHandler = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const user = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      cart: null,
      liked_products: null,
    };
    try {
      setLoading(true);
      addUser(user);
      toast.success("Confirm your email");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup--page flex items-center w-full justify-center min-h-[100vh] bg-white relative overflow-hidden">
      <div className="signup--banner w-1/2 hidden sm:block md:block lg:block xl:block">
        <img src={i} alt="" />
      </div>
      <div className="signup--form w-full sm:w-1/2 md:w-full lg:w-1/2 xl:w-1/2 h-full flex flex-col gap-3 items-start">
        <div className="form__title px-2 sm:px-0">
          <h1 className="text-xl font-bold">Create New Account</h1>
          <span className="subtitle text-sm text-gray-600">
            Please enter details
          </span>
        </div>
        <div className="form__input-wrapper form__first--name">
          <CustomInput
            value={firstName}
            changeHandler={(e) => setFirstName(e.target.value)}
            required={true}
            type="text"
            label="First name*"
            className="w-full"
            placeholder="Jhon"
          />
        </div>
        <div className="form__input-wrapper form__last--name">
          <CustomInput
            value={lastName}
            changeHandler={(e) => setLastName(e.target.value)}
            required={true}
            type="text"
            label="Last name*"
            className="w-full"
            placeholder="Doe"
          />
        </div>
        <div className="form__input-wrapper form__username">
          <CustomInput
            value={username}
            changeHandler={(e) => setUsername(e.target.value)}
            required={true}
            type="text"
            label="Username*"
            className="w-full"
            placeholder="Cavabanga"
          />
        </div>
        <div className="form__input-wrapper form__email">
          <CustomInput
            value={email}
            changeHandler={(e) => setEmail(e.target.value)}
            required={true}
            type="email"
            label="Email*"
            className="w-full"
            placeholder="example@mail.com"
          />
        </div>
        <div className="form__input-wrapper flex items-center form__password">
          <CustomInput
            value={password}
            changeHandler={(e) => setPassword(e.target.value)}
            required={true}
            type="password"
            label="Password*"
            className="w-full"
            placeholder="*********"
            withShowPassword={true}
          />
        </div>
        <div className="form__input-wrapper form__confirm--password">
          <CustomInput
            value={confirmPassword}
            changeHandler={(e) => setConfirmPassword(e.target.value)}
            required={true}
            type="password"
            label="Confirm password*"
            className="w-full"
            withShowPassword={true}
            placeholder="*********"
          />
        </div>
        <div className="form__alreay--have">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to={"/login"} className="text-blue-500">
              Login
            </NavLink>
          </p>
        </div>
        <div className="form__input-wrapper form__button">
          <button
            type="button"
            className="w-full bg-[#111] text-white rounded-md py-2 cursor-pointer"
            onClick={regUserHandler}
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
