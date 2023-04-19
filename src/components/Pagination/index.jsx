import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      className={styles.root}
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
