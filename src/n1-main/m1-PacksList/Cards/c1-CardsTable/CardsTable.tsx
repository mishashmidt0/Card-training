import React, { useCallback } from 'react';

import Button from '@mui/material/Button';
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
import { getCardsTC, removeCardTC } from '../cards-reducer';
import { CardsType } from '../cardsAPI';

import { NewCardNamesBtn } from './c1-NewCardNamesBtn/NewCardNamesBtn';
import s from './CardsTable.module.css';

export const CardsTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const cardsData = useAppSelector(state => state.cards);
  const { cardPackId } = useParams();
  const packUserId = useAppSelector(state => state.cards.packUserId);
  // eslint-disable-next-line no-underscore-dangle
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
  const removeCard = useCallback(
    (cardId: string, cardsPackId: string): void => {
      dispatch(removeCardTC(cardId));

      dispatch(getCardsTC({ cardsPack_id: cardsPackId, page: 1, pageCount: 10 }));
    },
    [cardPackId],
  );

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
              <TableCell align="center">{cards.grade}</TableCell>
              {userId === packUserId && (
                <TableCell align="center" className={s.buttonContainer}>
                  <>
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    <Button
                      variant="contained"
                      color="error"
                      disabled={loading}
                      onClick={() => {
                        // eslint-disable-next-line no-underscore-dangle
                        removeCard(cards._id, cards.cardsPack_id);
                      }}
                    >
                      Delete
                    </Button>
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    <NewCardNamesBtn
                      loading={loading}
                      question={cards.question}
                      answer={cards.answer}
                      /* eslint-disable-next-line no-underscore-dangle */
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
