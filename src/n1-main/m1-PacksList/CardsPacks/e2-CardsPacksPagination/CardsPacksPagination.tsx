import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { changePageCount } from '../../p1-FilterComponent/filter-reducer';
import { getCardsPacksTC } from '../cardsPacks-reducer';

import s from './CardsPacksPagination.module.css';

export const CardsPacksPagination = (): ReturnComponentType => {
  const pageCount = useAppSelector(state => state.filter.pageCount);
  const [page, setPage] = React.useState(0);

  const dispatch = useTypedDispatch();
  const cardPacksTotalCount = useAppSelector(
    state => state.cardsPacks.cardPacksTotalCount,
  );

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void = (event, newPage) => {
    setPage(newPage);
    dispatch(getCardsPacksTC({ pageCount, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void = event => {
    dispatch(changePageCount(parseInt(event.target.value, 10)));
    setPage(0);
    dispatch(getCardsPacksTC({ pageCount: parseInt(event.target.value, 10) }));
  };

  return (
    <TablePagination
      component="div"
      count={cardPacksTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={pageCount}
      onRowsPerPageChange={handleChangeRowsPerPage}
      className={s.paginatorContainer}
    />
  );
};
