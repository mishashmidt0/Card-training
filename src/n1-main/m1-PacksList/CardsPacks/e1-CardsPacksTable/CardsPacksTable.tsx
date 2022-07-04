import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { CardPackType } from '../cardsPacksAPI';

import s from './CardsPacksTable.module.css';

export const CardsPacksTable = (): ReturnComponentType => {
  const cardsPacksData = useAppSelector(state => state.cardsPacks);

  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

  return (
    <TableContainer component={Paper} className={s.cardsPacksTableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={s.tableHeadContainer}>
          <TableRow className={s.tableRow}>
            <TableCell>Name</TableCell>
            <TableCell align="center" className={s.cardsCountText}>
              Cards
            </TableCell>
            <TableCell align="center" className={s.lastUpdateText}>
              Last Updated
            </TableCell>
            <TableCell align="center">Created by</TableCell>
            <TableCell align="center">Actions</TableCell>
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
                {cardPack.name}
              </TableCell>
              <TableCell align="center">{cardPack.cardsCount}</TableCell>
              <TableCell align="center">{cardPack.updated}</TableCell>
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
