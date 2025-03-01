import { useParams } from "react-router-dom";

const ByCategoryPage = () => {
  const { category } = useParams();
  console.log(category);
  return (
    <div className="grid grid-cols-2 gap-6">No items in category. Soon....</div>
  );
};

export default ByCategoryPage;
