import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено <span className="end">!</span>
      </h1>
      <p>К сожелению данная страница отсутствует в нашем интернет магазине</p>
    </div>
  );
};

export default NotFoundBlock;
