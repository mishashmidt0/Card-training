import * as React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ReturnComponentType } from '../../../../n4-types';

function valuetext(value: number): string {
  return `${value}°C`;
}
const start = 20;
const end = 37;

export const RangeSlider = (): ReturnComponentType => {
  const [value, setValue] = React.useState<number[]>([start, end]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <h2>Number of cards</h2>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};
