import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/slices/cartSlice";

const CartItem = ({ id, title, imageUrl, price, type, count, size }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    // if (window.confirm('Вы точно хотите удалить из корзины?')) {
      dispatch(removeItem(id));
    // }
  }; 

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <FiMinus />
        </div>
        <b>{count}</b>
        <div
          onClick={() => onClickPlus()}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <FiPlus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <GrFormClose className="closeIcon" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
