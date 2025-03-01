import { useEffect, useState } from "react";
import { fetchCategoriesData, fetchProductsData } from "../../utils/api";
import IProduct from "../../models/Product";
import { MdChevronRight } from "react-icons/md";
import { NavLink, useSearchParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import ProductList from "../../components/ProductList/ProductList";
import { IoFilter } from "react-icons/io5";
import Pagination from "../../shared/Pagination/Pagination";
import { HiViewGrid } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import DropDown from "../../shared/Dropdown/Dropdown";
import useFilterCategory from "../../hooks/useFiltersCategroy";
import Loader from "../../shared/Loader/Loader";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 100000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>("Shot by latest");

  const [gridView, setGridView] = useState<string>("grid");

  const { selectedCategory, handleCheckInputChange } = useFilterCategory();

  const page = Number(searchParams.get("page")) || 1;
  const perPage = 20;
  const offset = (page - 1) * perPage;
  const handlePageChange = (selected: number) => {
    setSearchParams({ page: (selected + 1).toString() });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchProductsData();
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const fetchCategories = async () => {
      try {
        const res = await fetchCategoriesData();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);
  const confirmFiltersHandler = () => {
    window.scrollTo(0, 0);
    setSearchParams({ page: "1" });
    // Если нет выбранных категорий, возвращаем исходный массив
    if (selectedCategory.length === 0) {
      setFilteredProducts(products);
    } else {
      const newFiltered = products.filter((item) =>
        selectedCategory.some((category) => item.category === category)
      );
      setFilteredProducts(newFiltered);
    }
  };

  useEffect(() => {
    let updatedProducts = [...products];

    updatedProducts = updatedProducts.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    if (sortBy === "Shot by latest") {
      updatedProducts.sort((a, b) => +b.meta.createdAt - +a.meta.createdAt);
    } else if (sortBy === "Shot by price") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [price, sortBy, products]);

  const filterByPrice = (newPrice: number[]) => {
    setPrice(newPrice);
    setSearchParams({ page: "1" });
  };

  const handleOpen = () => {
    document.querySelector(".filters")?.classList.toggle("open");
  };

  const cardsRowHandler = () => {
    setGridView("row");
  };
  const listViewHandler = () => {
    setGridView("column");
  };

  return (
    <>
      <div className="products__page w-full relative">
        <div className="page__breadcrumbs px-3 flex items-center mb-10">
          <div className="flex items-center text-gray-400 text-sm">
            <NavLink
              to="/"
              className="breadcrumbs__link duration-300 hover:text-[#111]"
            >
              Home
            </NavLink>
            <span className="breadcrumbs__separator">
              <MdChevronRight />
            </span>
            <NavLink
              to="/products"
              className="breadcrumbs__link duration-300 text-[#111] underline"
            >
              Products
            </NavLink>
          </div>
          <div
            onClick={handleOpen}
            className="filters__hamburger md:block sm:hidden lg:hidden ml-auto p-2 rounded bg-[#111] text-white"
          >
            <IoFilter />
          </div>
        </div>

        <div className="products__page--content flex items-stretch">
          <Filters
            confirmFiltersHandler={confirmFiltersHandler}
            handleCheckInputChange={handleCheckInputChange}
            categories={categories}
            price={price}
            filterByPriceHandle={filterByPrice}
          />
          <div className="sm:w-[80%] md:w-full lg:w-[75%] w-full">
            <div className="products__sort--wrapper gap-2 p-3 text-lg text-gray-700 flex items-center">
              <div
                className="grid-columns__option cursor-pointer"
                onClick={listViewHandler}
              >
                <HiViewGrid />
              </div>
              <div
                className="grid-rows__option cursor-pointer"
                onClick={cardsRowHandler}
              >
                <LuLayoutList />
              </div>
              <div className="results__show--wrapper text-sm hidden md:block sm:block">
                <span>
                  Showing {offset + 1}-
                  {Math.min(offset + perPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length} results
                </span>
              </div>
              <div className="sort__by--dropdown text-sm ml-auto relative">
                <DropDown title={sortBy}>
                  {["Shot by latest", "Shot by price"].map((item) => (
                    <div
                      key={item}
                      onClick={() => setSortBy(item)}
                      className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:text-red-500"
                    >
                      {item}
                    </div>
                  ))}
                </DropDown>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <ProductList
                view={gridView}
                products={filteredProducts.slice(offset, offset + perPage)}
              />
            )}
          </div>
        </div>
        <div className="products__page--pagination w-full py-5 flex justify-center md:justify-center xl:justify-end">
          <Pagination
            pageCount={Math.ceil(filteredProducts.length / perPage)}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
