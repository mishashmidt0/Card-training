import * as React from 'react';
import { FC } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { ReturnComponentType } from '../../../../n4-types';

type PropsType = {
  grade: number;
};

export const CardRating: FC<PropsType> = ({ grade }): ReturnComponentType => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={grade} readOnly />
    </Box>
  );
};
