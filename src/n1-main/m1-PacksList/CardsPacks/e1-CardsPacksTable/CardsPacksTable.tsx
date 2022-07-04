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
import { CardPackType } from '../cardsPacksAPI';

export const CardsPacksTable = (): ReturnComponentType => {
  const cardsPacksData = useAppSelector(state => state.cardsPacks);

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => state.profile.profile._id);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                <TableCell align="right">{cardPack.cardsCount}</TableCell>
                <TableCell align="right">{cardPack.updated}</TableCell>
                <TableCell align="right">{cardPack.user_name}</TableCell>
                <TableCell align="right">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  {userId === cardPack._id || (
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
    </div>
  );
};
