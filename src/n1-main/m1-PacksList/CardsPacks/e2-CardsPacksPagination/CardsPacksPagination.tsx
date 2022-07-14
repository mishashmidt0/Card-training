import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { changePageCount } from '../../p1-FilterComponent/filter-reducer';
import { FilterText } from '../../p3-enums/enums';
import { getCardsPacksTC } from '../cardsPacks-reducer';

import s from './CardsPacksPagination.module.css';

export const CardsPacksPagination = (): ReturnComponentType => {
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const filter = useAppSelector(state => state.filter);
  const loading = useAppSelector(state => state.app.loading);
  const [page, setPage] = React.useState(0);

  const dispatch = useTypedDispatch();
  const cardPacksTotalCount = useAppSelector(
    state => state.cardsPacks.cardPacksTotalCount,
  );

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void = (event, newPage) => {
    const payload =
      filter.isShowCards === FilterText.my
        ? { user_id: userId, pageCount: filter.pageCount, page: newPage + 1 }
        : { pageCount: filter.pageCount, page: newPage + 1 };

    setPage(newPage);
    dispatch(getCardsPacksTC(payload));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void = event => {
    const payload =
      filter.isShowCards === FilterText.my
        ? { user_id: userId, pageCount: parseInt(event.target.value, 10) }
        : { pageCount: parseInt(event.target.value, 10) };

    dispatch(changePageCount(parseInt(event.target.value, 10)));
    setPage(0);
    dispatch(getCardsPacksTC(payload));
  };

  if (!loading) {
    return (
      <TablePagination
        component="div"
        count={cardPacksTotalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={filter.pageCount}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={s.paginatorContainer}
        showLastButton
        showFirstButton
        SelectProps={{
          disabled: loading,
        }}
      />
    );
  }

  return (
    <TablePagination
      component="div"
      count={cardPacksTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={filter.pageCount}
      onRowsPerPageChange={handleChangeRowsPerPage}
      className={s.paginatorContainer}
      showLastButton
      showFirstButton
      SelectProps={{
        disabled: loading,
      }}
      backIconButtonProps={{ disabled: loading }}
      nextIconButtonProps={{ disabled: loading }}
    />
  );
};
