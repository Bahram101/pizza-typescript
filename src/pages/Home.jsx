import React, { useEffect, useState, useContext, useRef } from "react";
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
import qs from "qs";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);

  const search = searchValue ? `&search=${searchValue}` : "";

  console.log('items', items);
  console.log('status', status);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // При первом рендере запрашиваем все пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
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
        {status ==='isLoading'
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
