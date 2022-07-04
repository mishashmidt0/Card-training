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

export const CardPackTable = (): ReturnComponentType => {
  const cardsPacksData = useAppSelector(state => state.cardsPacks);

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
            {cardsPacksData.cardPacks.map((row: CardPackType) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cardsCount}</TableCell>
                <TableCell align="right">{row.updated}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">
                  <button type="button">Delete</button>
                  <button type="button">Edit</button>
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
