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

  useEffect(() => {
    fetch("https://629dc2ffc6ef9335c0a5514c.mockapi.io/items")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title text-3xl">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items?.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
    </>
  );
}

export default Home;
