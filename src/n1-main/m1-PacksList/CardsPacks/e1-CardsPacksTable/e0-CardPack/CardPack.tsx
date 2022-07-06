import React, { useCallback } from 'react';

import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../../n4-types';

import s from './CardPack.module.css';

export const CardPack = ({
  userId,
  cardPackId,
  cardPackName,
  cardPackCardsCount,
  cardPackUpdated,
  cardPackUserName,
  cardPackUserId,
  getCards,
}: CardPackPropsType): ReturnComponentType => {
  const onClickHandler = useCallback((): void => {
    getCards(cardPackId);
  }, []);

  const cutTheString = (str: string): string => {
    // eslint-disable-next-line no-magic-numbers
    if (str.length >= 50) {
      // eslint-disable-next-line no-magic-numbers
      return `${str.slice(0, 50)}...`;
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
          <span>
            <Button variant="contained" color="error">
              Delete
            </Button>
            <Button variant="contained">Edit</Button>
          </span>
        )}
        <Button variant="outlined" onClick={onClickHandler}>
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
};
