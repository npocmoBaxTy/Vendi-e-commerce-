import IProduct from "../../models/Product";
import Card from "../../shared/Card/Card";
import { FC } from "react";

interface IProductList {
  products: IProduct[];
  view: string;
}

const ProductList: FC<IProductList> = ({ products, view }) => {
  if (products.length === 0) return <div>No results found!</div>;
  return (
    <div className="product__list--wrapper">
      <div className="product__list--content flex justify-between w-full items-stretch flex-wrap">
        {products.map((item) => {
          return <Card product={item} view={view} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
