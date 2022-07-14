import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { getCardsTC } from '../cards-reducer';
import { CardsType } from '../cardsAPI';
import { CardRating } from '../Rating/CardRating';

import { NewCardNamesBtn } from './c1-NewCardNamesBtn/NewCardNamesBtn';
import { DeleteCardBtn } from './c2-DeleteCardBtn/DeleteCardBtn';
import s from './CardsTable.module.css';

export const CardsTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const cardsData = useAppSelector(state => state.cards);
  const { cardPackId } = useParams();
  const packUserId = useAppSelector(state => state.cards.packUserId);
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const loading = useAppSelector(state => state.app.loading);

  const [sortCardsUpdate, setSortCardsUpdate] = React.useState<boolean>(true);

  const sortForCardsUpdate: () => void = () => {
    if (sortCardsUpdate) {
      dispatch(
        getCardsTC({
          cardsPack_id: cardPackId,
          page: 1,
          pageCount: 10,
          sortCards: '0updated',
        }),
      );
    } else {
      dispatch(
        getCardsTC({
          cardsPack_id: cardPackId,
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
              <TableCell align="center" size="small">
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData.cards.map((cards: CardsType, index) => (
            <TableRow
              /* eslint-disable-next-line no-underscore-dangle */
              key={cards._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              /* eslint-disable-next-line no-magic-numbers */
              className={`${s.cardContainer} ${index % 2 ? s.addBackGround : ''}`}
            >
              <TableCell component="th" scope="row" className={s.questionText}>
                {cards.question}
              </TableCell>
              <TableCell align="center">{cards.answer}</TableCell>
              <TableCell align="center">
                {new Date(cards.updated).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                <CardRating grade={cards.grade} />
              </TableCell>
              {userId === packUserId && (
                <TableCell align="center" className={s.buttonContainer}>
                  <>
                    <DeleteCardBtn cardId={cards._id} />
                    <NewCardNamesBtn
                      loading={loading}
                      question={cards.question}
                      answer={cards.answer}
                      cardId={cards._id}
                    />
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
