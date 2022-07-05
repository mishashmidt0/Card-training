import React, { useCallback } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../n4-types';

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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {cutTheString(cardPackName)}
      </TableCell>
      <TableCell align="center">{cardPackCardsCount}</TableCell>
      <TableCell align="center">
        {new Date(cardPackUpdated).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">{cardPackUserName}</TableCell>
      <TableCell align="center">
        {userId === cardPackUserId && (
          <span>
            <button type="button">Delete</button>---
            <button type="button">Edit</button>---
          </span>
        )}
        {/* eslint-disable-next-line no-underscore-dangle */}
        <button type="button" onClick={onClickHandler}>
          Learn
        </button>
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
