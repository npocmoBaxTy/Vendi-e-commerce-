import { ChangeEvent, useState } from "react";
import CustomInput from "../../shared/Input/Input";
import IProduct from "../../models/Product";
import { fetchSearchData } from "../../utils/api";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../shared/Loader/Loader";
import Pagination from "../../shared/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [value, setValue] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchProductsHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (value === "") {
      setProducts([]);
    }
    setValue(e.target.value);
    try {
      setLoading(true);
      const res = await fetchSearchData(e.target.value);
      setProducts(res.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  // Pagination params
  const page = Number(searchParams.get("page")) || 1;
  const perPage = 20;
  const offset = (page - 1) * perPage;
  // Pagination handlers
  const handlePageChange = (selected: number) => {
    setSearchParams({ page: (selected + 1).toString() });
    window.scrollTo(0, 0);
  };
  return (
    <div className="search__page">
      <div className="search__page--input--form p-3">
        <CustomInput
          value={value}
          label="Type here"
          className="w-full"
          type="text"
          changeHandler={searchProductsHandler}
        />
      </div>
      <div className="search__page--title text-xl py-3">
        Search results for "{value}"{" "}
        {products.length === 0 ? "" : `(${products.length} results)`}
      </div>
      <div className="search__result--wrapper">
        {loading ? (
          <Loader />
        ) : (
          <ProductList
            view="grid"
            products={products.slice(offset, offset + perPage)}
          />
        )}
      </div>
      <div className="search__page--pagination flex justify-end py-5">
        <Pagination
          pageCount={Math.ceil(products.length / perPage)}
          onPageChange={handlePageChange}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default SearchPage;
