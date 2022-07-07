import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { getCardsTC } from '../cards-reducer';
import { CardsType } from '../cardsAPI';

import s from './CardsTable.module.css';

export const CardsTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const cardsData = useAppSelector(state => state.cards);
  const cardsPackId = useAppSelector(state => state.cards.cards[0].cardsPack_id);
  const packUserId = useAppSelector(state => state.cards.packUserId);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

  const [sortCardsUpdate, setSortCardsUpdate] = React.useState<boolean>(true);

  const sortForCardsUpdate: () => void = () => {
    if (sortCardsUpdate) {
      dispatch(
        getCardsTC({
          cardsPack_id: cardsPackId,
          page: 1,
          pageCount: 10,
          sortCards: '0updated',
        }),
      );
    } else {
      dispatch(
        getCardsTC({
          cardsPack_id: cardsPackId,
          page: 1,
          pageCount: 10,
          sortCards: '1updated',
        }),
      );
    }
    setSortCardsUpdate(!sortCardsUpdate);
  };

  return (
    <TableContainer component={Paper} className={s.cardsTableContainer}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        size="small"
        className={s.cardsTable}
      >
        <TableHead className={s.tableHeadContainer}>
          <TableRow className={s.tableRow}>
            <TableCell size="small">Question</TableCell>
            <TableCell align="center" size="small">
              Answer
            </TableCell>
            <TableCell
              align="center"
              size="small"
              className={s.lastUpdateText}
              onClick={sortForCardsUpdate}
            >
              Last Updated
              {sortCardsUpdate ? <span> ▲</span> : <span> ▼</span>}
            </TableCell>
            <TableCell align="center" size="small">
              Grade
            </TableCell>
            {userId === packUserId && (
              <TableCell align="center" className={s.buttonContainer}>
                <Button variant="contained" color="secondary">
                  Actions
                </Button>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData.cards.map((cards: CardsType) => (
            <TableRow
              /* eslint-disable-next-line no-underscore-dangle */
              key={cards._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {cards.question}
              </TableCell>
              <TableCell align="center">{cards.answer}</TableCell>
              <TableCell align="center">
                {new Date(cards.updated).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{cards.grade}</TableCell>
              {userId === packUserId && (
                <TableCell align="center" className={s.buttonContainer}>
                  <>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                    <Button variant="contained" color="secondary">
                      Edit
                    </Button>
                  </>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
