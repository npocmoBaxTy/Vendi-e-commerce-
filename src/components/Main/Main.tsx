import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { fetchCommentsData, fetchProductsData } from "../../utils/api";
import IProduct from "../../models/Product";
import ByCategory from "../ByCategory/ByCategory";
import BestSellers from "../BestSellers/BestSellers";
import HomePageComments from "../Commentaries/HomePageComments";
import IComment from "../../models/Comment";

const Main = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [commentaires, setCommentaires] = useState<IComment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchProductsData();
      setProducts(res.data.products);
    };
    fetchData();

    const fetchComments = async () => {
      const res = await fetchCommentsData();
      setCommentaires(res.comments);
    };
    fetchComments();
  }, []);
  return (
    <main className="main__block p-2">
      <Banner img={products[0]?.images[0]} />
      <ByCategory />
      <BestSellers products={products} />
      <HomePageComments comments={commentaires} />
    </main>
  );
};

export default Main;
