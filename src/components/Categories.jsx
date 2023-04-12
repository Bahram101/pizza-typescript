import React, { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categoryList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (i) => {
    setActiveIndex(i);
  };
  console.log(activeIndex);

  return (
    <div className="categories">
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex == index && "active"}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
