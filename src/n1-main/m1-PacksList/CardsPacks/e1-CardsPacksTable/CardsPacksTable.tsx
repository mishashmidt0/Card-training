import React, { useCallback } from 'react';

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
import { maxPageCount } from '../../p4-constants/constants';
import { getCardsPacksTC, removeCardPackTC } from '../cardsPacks-reducer';
import { CardPackType } from '../cardsPacksAPI';

import s from './CardsPacksTable.module.css';
import { CardPack } from './e0-CardPack/CardPack';

export const CardsPacksTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const cardsPacksData = useAppSelector(state => state.cardsPacks);
  const loading = useAppSelector(state => state.app.loading);
  const filter = useAppSelector(state => state.filter);

  const [sortCardsCount, setSortCardsCount] = React.useState<boolean>(true);
  const [sortCardsUpdate, setSortCardsUpdate] = React.useState<boolean>(false);

  const sortForCardsCount: () => void = () => {
    if (!loading) {
      if (sortCardsCount) {
        const payload = { ...filter, sortPacks: '0cardsCount' };

        dispatch(getCardsPacksTC(payload)).then(() => {
          setSortCardsCount(!sortCardsCount);
        });
      } else {
        const payload = { ...filter, sortPacks: '1cardsCount' };

        dispatch(getCardsPacksTC(payload)).then(() => {
          setSortCardsCount(!sortCardsCount);
        });
      }
    }
  };
  const sortForCardsUpdate: () => void = () => {
    if (!loading) {
      if (sortCardsUpdate) {
        const payload = { ...filter, sortPacks: '0cardsCount' };

        dispatch(getCardsPacksTC(payload)).then(() => {
          setSortCardsUpdate(!sortCardsUpdate);
        });
      } else {
        const payload = { ...filter, sortPacks: '1cardsCount' };

        dispatch(getCardsPacksTC(payload)).then(() => {
          setSortCardsUpdate(!sortCardsUpdate);
        });
      }
    }
  };

  const navigate = useNavigate();
  const getCards = useCallback((cardPackId: string): void => {
    navigate(`/cards/${cardPackId}`);
  }, []);
  const learnCards = useCallback((cardPackId: string, cardPackName: string): void => {
    dispatch(getCardsTC({ cardsPack_id: cardPackId, pageCount: maxPageCount })).then(
      () => {
        return navigate(`/learn/${cardPackName}/${cardPackId}`);
      },
    );
  }, []);

  const removeCardPack = useCallback(
    (cardPackId: string): void => {
      dispatch(removeCardPackTC(cardPackId, filter));
    },
    [filter, userId],
  );

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
        <TableBody className={s.cardContainer}>
          {cardsPacksData.cardPacks.map((cardPack: CardPackType, index) => (
            <CardPack
              key={cardPack._id}
              userId={userId}
              cardPackId={cardPack._id}
              cardPackName={cardPack.name}
              cardPackCardsCount={cardPack.cardsCount}
              cardPackUpdated={cardPack.updated}
              cardPackUserName={cardPack.user_name}
              cardPackUserId={cardPack.user_id}
              getCards={getCards}
              removeCardPack={removeCardPack}
              learnCards={learnCards}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
