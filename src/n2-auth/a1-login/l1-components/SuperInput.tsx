import React, { FC } from 'react';
import { TextField } from '@mui/material';

type SuperInputType = {
  title: string;
  name: string;
  handleBlur: any;
  handleChange: any;
  value: any;
};

export const SuperInput: FC<SuperInputType> = React.memo(
  ({ title, name, handleBlur, handleChange, value }) => {
    return (
      <div>
        <TextField
          id="standard-basic"
          label={title}
          variant="standard"
          type={name}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </div>
    );
  },
);
