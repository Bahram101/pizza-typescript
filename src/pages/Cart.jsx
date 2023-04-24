import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearItems } from "../redux/slices/cartSlice";
import CartItem from "../components/CartItem";
import { FcFullTrash } from "react-icons/fc";
import { IoMdCart } from "react-icons/io";
import { HiOutlineChevronLeft } from "react-icons/hi";

const Cart = () => {
  const { items, totalPrice, totalCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onClickClearCart = () => {
    if (window.confirm("Вы точно хотите очистин корзину?")) {
      dispatch(clearItems());
    }
  };

  console.log("items", items);

  return (
    <div className="container container--cart">
      {items.length === 0 ? (
        <h1 style={{ textAlign: "center", fontSize: 40 }}>Корзина пусто</h1>
      ) : (
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <IoMdCart /> Корзина
            </h2>
            <div className="cart__clear">
              <FcFullTrash />
              <span onClick={onClickClearCart}> Очистить корзину</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                {" "}
                Всего пицц: <b>{totalCount} шт.</b>{" "}
              </span>
              <span>
                {" "}
                Сумма заказа: <b>{totalPrice}₽</b>{" "}
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link
                to="/"
                className="button button--outline button--add go-back-btn"
              >
                <HiOutlineChevronLeft />

                <span>Вернуться назад</span>
              </Link>
              <div className="button pay-btn">
                <span>Оплатить сейчас</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
