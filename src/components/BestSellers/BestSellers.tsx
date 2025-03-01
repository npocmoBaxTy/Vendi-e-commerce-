import IProduct from "../../models/Product";
import ProductList from "../ProductList/ProductList";

const BestSellers = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="best--sellers w-full py-10">
      <h1 className="best--sellers__title mb-10 text-gray-700 text-center text-2xl">
        Our Bestseller
      </h1>
      <ProductList
        view="grid"
        products={products.filter((item) => item.rating > 4.5).slice(0, 8)}
      />
    </div>
  );
};

export default BestSellers;
