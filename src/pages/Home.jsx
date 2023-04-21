import { useEffect, useState, useContext, useRef } from "react";
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import "../scss/app.scss";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const order = sort.sortProperty.includes("-") ? "desc" : "asc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?page=${currentPage}&limit=${4}${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
  };

  // При первом рендере запрашиваем все пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, search, currentPage]);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, search, currentPage]);

  //После первого рендера проверяем URL параметры и сохроняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sort);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []); 

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
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

export default Home;
