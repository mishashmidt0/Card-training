import React from 'react';

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
import { getCardsPacksTC } from '../cardsPacks-reducer';
import { CardPackType } from '../cardsPacksAPI';

import s from './CardsPacksTable.module.css';

export const CardsPacksTable = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const cardsPacksData = useAppSelector(state => state.cardsPacks);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

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

  const cutTheString = (str: string): string => {
    // eslint-disable-next-line no-magic-numbers
    if (str.length >= 50) {
      // eslint-disable-next-line no-magic-numbers
      return `${str.slice(0, 50)}...`;
    }

    return str;
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
            <TableRow
              /* eslint-disable-next-line no-underscore-dangle */
              key={cardPack._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {cutTheString(cardPack.name)}
              </TableCell>
              <TableCell align="center">{cardPack.cardsCount}</TableCell>
              <TableCell align="center">
                {new Date(cardPack.updated).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{cardPack.user_name}</TableCell>
              <TableCell align="center">
                {userId === cardPack.user_id && (
                  <span>
                    <button type="button">Delete</button>---
                    <button type="button">Edit</button>---
                  </span>
                )}
                <button type="button">Learn</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
