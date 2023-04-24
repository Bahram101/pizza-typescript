import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?id=${id}`
        );
        setPizza(data[0]);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className="fullPizza">
        <img src={pizza.imageUrl} className="fullPizzaImg" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div> 
    </div>
  );
};

export default FullPizza;
