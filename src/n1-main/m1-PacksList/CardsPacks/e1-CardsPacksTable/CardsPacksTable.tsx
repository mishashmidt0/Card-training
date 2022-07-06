import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { getCardsTC } from '../../Cards/cards-reducer';
import { getCardsPacksTC } from '../cardsPacks-reducer';
import { CardPackType } from '../cardsPacksAPI';

import s from './CardsPacksTable.module.css';
import { CardPack } from './e0-CardPack/CardPack';

export const CardsPacksTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const cardsPacksData = useAppSelector(state => state.cardsPacks);

  const [sortCardsCount, setSortCardsCount] = React.useState<boolean>(true);
  const [sortCardsUpdate, setSortCardsUpdate] = React.useState<boolean>(true);

  const sortForCardsCount: () => void = () => {
    if (sortCardsCount) {
      dispatch(getCardsPacksTC({ page: 1, pageCount: 10, sortPacks: '0cardsCount' }));
    } else {
      dispatch(getCardsPacksTC({ page: 1, pageCount: 10, sortPacks: '1cardsCount' }));
    }
    setSortCardsCount(!sortCardsCount);
  };
  const sortForCardsUpdate: () => void = () => {
    if (sortCardsUpdate) {
      dispatch(getCardsPacksTC({ page: 1, pageCount: 10, sortPacks: '0updated' }));
    } else {
      dispatch(getCardsPacksTC({ page: 1, pageCount: 10, sortPacks: '1updated' }));
    }
    setSortCardsUpdate(!sortCardsUpdate);
  };
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getCards = (cardPackId: string): void => {
    dispatch(getCardsTC({ cardsPack_id: cardPackId, page: 1, pageCount: 10 }));
    navigate('/cards');
  };

  return (
    <TableContainer component={Paper} className={s.cardsPacksTableContainer}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        size="small"
        className={s.cardsPacksTable}
      >
        <TableHead className={s.tableHeadContainer}>
          <TableRow className={s.tableRow}>
            <TableCell size="small">Name</TableCell>
            <TableCell
              align="center"
              size="small"
              className={s.cardsCountText}
              onClick={sortForCardsCount}
            >
              Cards
              {sortCardsCount ? <span> ▲</span> : <span> ▼</span>}
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
              Created by
            </TableCell>
            <TableCell align="center" size="small">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsPacksData.cardPacks.map((cardPack: CardPackType) => (
            <CardPack
              /* eslint-disable-next-line no-underscore-dangle */
              key={cardPack._id}
              userId={userId}
              /* eslint-disable-next-line no-underscore-dangle */
              cardPackId={cardPack._id}
              cardPackName={cardPack.name}
              cardPackCardsCount={cardPack.cardsCount}
              cardPackUpdated={cardPack.updated}
              cardPackUserName={cardPack.user_name}
              cardPackUserId={cardPack.user_id}
              getCards={getCards}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
