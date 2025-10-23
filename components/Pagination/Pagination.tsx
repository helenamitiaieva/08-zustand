import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export interface PaginationProps {
  pageCount: number;             
  currentPage: number;    
  onPageChange: (page: number) => void; 
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousClassName={css.prev}
      nextClassName={css.next}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={Math.max(0, (currentPage ?? 1) - 1)} // робимо контрольованим
      onPageChange={(ev) => onPageChange(ev.selected + 1)} // ev.selected починається з 0
    />
  );
}