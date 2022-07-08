import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { getCardsTC } from '../cards-reducer';

import s from './CardsPagination.module.css';

export const CardsPagination = (): ReturnComponentType => {
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line no-magic-numbers
  const [pageCount, setPageCount] = React.useState(10);

  const dispatch = useTypedDispatch();
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const { cardPackId } = useParams();

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void = (event, newPage) => {
    setPage(newPage);
    dispatch(getCardsTC({ cardsPack_id: cardPackId, pageCount, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void = event => {
    setPageCount(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(
      getCardsTC({
        cardsPack_id: cardPackId,
        pageCount: parseInt(event.target.value, 10),
      }),
    );
  };

  return (
    <TablePagination
      component="div"
      count={cardsTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={pageCount}
      onRowsPerPageChange={handleChangeRowsPerPage}
      className={s.paginatorContainer}
    />
  );
};
