import React, { useCallback } from 'react';

import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../../n4-types';
import { useAppSelector } from '../../../../../n5-bll/redux';
import { maxLengthPackName } from '../../../p4-constants/constants';

import s from './CardPack.module.css';
import { NewCardPackNameBtn } from './k1-NewCardPackName/NewCardPackNameBtn';

export const CardPack = ({
  userId,
  cardPackId,
  cardPackName,
  cardPackCardsCount,
  cardPackUpdated,
  cardPackUserName,
  cardPackUserId,
  getCards,
  removeCardPack,
  learnCards,
  index,
}: CardPackPropsType): ReturnComponentType => {
  const loading = useAppSelector(state => state.app.loading);
  const filter = useAppSelector(state => state.filter);

  const onClickHandler = useCallback((): void => {
    getCards(cardPackId);
  }, [cardPackId, getCards]);

  const removeCardPackHandler = useCallback((): void => {
    removeCardPack(cardPackId);
  }, [cardPackId, removeCardPack, filter]);

  const learnCardPackHandler = useCallback((): void => {
    learnCards(cardPackId, cardPackName);
  }, [cardPackId, learnCards]);

  const cutTheString = (str: string): string => {
    if (str.length >= maxLengthPackName) {
      return `${str.slice(0, maxLengthPackName)}...`;
    }

    return str;
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      /* eslint-disable-next-line no-magic-numbers */
      className={`${s.cardContainer} ${index % 2 ? s.addBackGround : ''}`}
    >
      <TableCell scope="row" className={s.cardPackName}>
        <button onClick={onClickHandler} type="button">
          {cutTheString(cardPackName)}
        </button>
      </TableCell>
      <TableCell align="center">{cardPackCardsCount}</TableCell>
      <TableCell align="center">
        {new Date(cardPackUpdated).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">{cardPackUserName}</TableCell>
      <TableCell align="center" className={s.buttonContainer}>
        {userId === cardPackUserId && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={removeCardPackHandler}
              disabled={loading}
            >
              Delete
            </Button>
            <NewCardPackNameBtn cardPackId={cardPackId} loading={loading} />
          </>
        )}
        <Button
          variant="outlined"
          disabled={cardPackCardsCount === 0 || loading}
          style={{ background: 'white' }}
          onClick={learnCardPackHandler}
        >
          Learn
        </Button>
      </TableCell>
    </TableRow>
  );
};

type CardPackPropsType = {
  userId: string;
  cardPackId: string;
  cardPackName: string;
  cardPackCardsCount: number;
  cardPackUpdated: string;
  cardPackUserName: string;
  cardPackUserId: string;
  getCards: (cardPackId: string) => void;
  removeCardPack: (cardPackId: string) => void;
  learnCards: (cardPackId: string, cardPackName: string) => void;
  index: number;
};
