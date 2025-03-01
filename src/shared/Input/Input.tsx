import { Field, Label } from "@headlessui/react";
import { ChangeEvent, FC, useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

interface ICustomInput {
  type: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  value?: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  withShowPassword?: boolean;
}

const CustomInput: FC<ICustomInput> = ({
  type,
  label,
  changeHandler,
  required,
  className,
  value,
  name,
  placeholder,
  id,
  withShowPassword,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const showPassHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full">
      <Field className={"flex flex-col"}>
        <Label className="text-sm/6 font-medium text-[#111]">{label}</Label>
        <div className="relative">
          <input
            name={name}
            id={id}
            required={required}
            onChange={changeHandler}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            placeholder={placeholder}
            value={value}
            className={`border border-[#111] rounded-md px-3 py-1 ${className}`}
          />
          {withShowPassword && (
            <span
              onClick={showPassHandler}
              className="absolute top-1/2 -translate-y-1/2 right-2"
            >
              {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
            </span>
          )}
        </div>
      </Field>
    </div>
  );
};

export default CustomInput;
