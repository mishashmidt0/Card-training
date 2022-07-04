import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { getCardsPacksTC } from '../cardsPacks-reducer';

import s from './CardsPacksPagination.module.css';

export const CardsPacksPagination = (): ReturnComponentType => {
  // eslint-disable-next-line no-magic-numbers
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
    dispatch(getCardsPacksTC(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getCardsPacksTC(parseInt(event.target.value, 10)));
  };

  return (
    <TablePagination
      component="div"
      count={cardPacksTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      className={s.paginatorContainer}
    />
  );
};
