import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import "../scss/app.scss";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty}&order=desc`
    )
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId,sort]);

  console.log("cateogryId", categoryId);
  console.log("sort", sort.sortProperty);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sort} onChangeSort={(id) => setSort(id)} />
      </div>
      <h2 className="content__title text-3xl">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items?.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
