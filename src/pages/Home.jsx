import { useEffect, useState, useContext } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../layouts/MainLayout";
import "../scss/app.scss";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";

function Home() {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.counter.value);
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState({
    name: "цене (ASC)",
    sortProperty: "price",
  });
  const { searchValue } = useContext(SearchContext);

  const order = sort.sortProperty.includes("-") ? "desc" : "asc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  console.log('sort', sort);
  console.log('sortBy', sortBy);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?page=${currentPage}&limit=${3}${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, currentPage]);

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
          : items
              ?.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
