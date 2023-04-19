import { useEffect, useState, useContext } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../layouts/MainLayout";
import "../scss/app.scss";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSort, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs'

function Home() {
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const order = sort.sortProperty.includes("-") ? "desc" : "asc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?page=${currentPage}&limit=${4}${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, currentPage]);


  console.log('pageCount',currentPage)

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort value={sort} onChangeSort={(obj) => dispatch(setSort(obj))} />
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
      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}

export default Home;
