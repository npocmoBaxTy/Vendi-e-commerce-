import { Checkbox } from "@headlessui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface CheckInputProps {
  onChange: (isChecked: boolean) => void;
}

const CheckInput = ({ onChange }: CheckInputProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const handleChange = (checked: boolean) => {
    setEnabled(checked);
    onChange(checked);
  };
  return (
    <Checkbox
      checked={enabled}
      onChange={handleChange}
      className="group size-4 rounded-md bg-white/10 p-1 ring-1 ring-black/15 ring-inset data-[checked]:bg-[#111]"
    >
      <FaCheck className="hidden size-2 fill-white group-data-[checked]:block" />
    </Checkbox>
  );
};

export default CheckInput;
