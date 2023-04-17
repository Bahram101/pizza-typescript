import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
        breakLabel="..."
        className={styles.root}
        previousLabel="<"
        nextLabel=">"
        onPageChange={e => onChangePage(e.selected+1)}
        pageRangeDisplayed={3}
        pageCount={4}
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination