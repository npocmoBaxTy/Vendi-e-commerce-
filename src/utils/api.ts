import axios from "axios";

export const fetchProductsData = () => {
  const data = axios.get("https://dummyjson.com/products?limit=0");
  return data;
};

export const fetchProductDetails = (productId: number) => {
  const data = axios.get(`https://dummyjson.com/products/${productId}`);
  return data;
};

export const fetchCategoriesData = () => {
  const data = axios.get("https://dummyjson.com/products/category-list");
  return data;
};

export const fetchCommentsData = async () => {
  const data = await axios.get("https://dummyjson.com/comments");
  return data.data;
};

export const fetchSearchData = async (query: string) => {
  const data = await axios.get(
    `https://dummyjson.com/products/search?q=${query}&order=asc`
  );
  return data.data;
};
