import React from "react";
import styles from "./NotFoundBlock.module.scss";

console.log(styles);

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено <span className={styles.notFound}>!</span>
      </h1>
      <p>К сожелению данная страница отсутствует в нашем интернет магазине</p>
    </div>
  );
};

export default NotFoundBlock;
