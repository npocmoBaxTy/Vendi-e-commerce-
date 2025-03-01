import { useEffect, useState } from "react";

const useFilterCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {}, [selectedCategory]);

  const handleCheckInputChange = (item: string, isChecked: boolean) => {
    setSelectedCategory((prev) =>
      isChecked ? [...prev, item] : prev.filter((i) => i !== item)
    );
  };

  return {
    selectedCategory,
    handleCheckInputChange,
    setSelectedCategory,
  };
};

export default useFilterCategory;
