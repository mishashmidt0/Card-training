import React from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { HeaderTitle } from '../Header';

export const ButtonMainLinks = (): ReturnComponentType => {
  return (
    <div>
      <Button variant="text">
        <Link to="/">{HeaderTitle.profile}</Link>
      </Button>
      <Button variant="text">
        <Link to="/list">{HeaderTitle.packsList}</Link>
      </Button>
    </div>
  );
};
