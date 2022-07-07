import React, { useCallback } from 'react';

import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../../n4-types';
import { useAppSelector } from '../../../../../n5-bll/redux';
import { maxLengthPackName } from '../../../p4-constants/constants';

import s from './CardPack.module.css';
import { NewCardPackName } from './k1-NewCardPackName/NewCardPackName';

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
}: CardPackPropsType): ReturnComponentType => {
  const loading = useAppSelector(state => state.app.loading);

  const onClickHandler = useCallback((): void => {
    getCards(cardPackId);
  }, []);
  const removeCardPackHandler = useCallback((): void => {
    removeCardPack(cardPackId);
  }, []);

  const cutTheString = (str: string): string => {
    if (str.length >= maxLengthPackName) {
      return `${str.slice(0, maxLengthPackName)}...`;
    }

    return str;
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      className={s.cardContainer}
    >
      <TableCell scope="row">{cutTheString(cardPackName)}</TableCell>
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
            <NewCardPackName cardPackId={cardPackId} loading={loading} />
          </>
        )}
        <Button variant="outlined" onClick={onClickHandler} disabled={loading}>
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
};
