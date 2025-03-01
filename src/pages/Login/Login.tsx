import { useState } from "react";
import CustomInput from "../../shared/Input/Input";
import i from "./../../assets/undraw_welcome-cats_tw36.png";
import "./Login.css";
import useRegUser from "../../hooks/useRegUser";
import { NavLink } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signUser } = useRegUser();
  const handleSubmit = async () => {
    try {
      console.log("try");
      setLoading(true);
      await signUser({ email, password });
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup--page flex items-center w-full justify-center min-h-[80vh] bg-white relative overflow-hidden">
      <div className="signup--banner w-1/2 hidden sm:block md:block lg:block xl:block">
        <img src={i} alt="" />
      </div>
      <div className="signup--form w-full sm:w-1/2 md:w-full lg:w-1/2 xl:w-1/2 h-full flex flex-col gap-3 items-start">
        <div className="form__title px-2 sm:px-0">
          <h1 className="text-xl font-bold">Welcome!</h1>
          <span className="subtitle text-sm text-gray-600">
            Please login here
          </span>
        </div>
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
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
          <div className="not__have px-2 sm:px-0">
            <span className="text-gray-600">Don't have an account yet?</span>
            <NavLink to="/signup" className="text-[#111] ml-2 underline">
              Sign up now!
            </NavLink>
          </div>
          <div className="form__input-wrapper form__button">
            <button
              type="button"
              disabled={loading}
              className={`w-full bg-[#111] text-white rounded-md py-2 cursor-pointer ${
                loading && "bg-gray-300 flex justify-center"
              }`}
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
