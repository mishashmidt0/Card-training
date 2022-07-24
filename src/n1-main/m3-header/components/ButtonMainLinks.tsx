import React from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { HeaderTitle } from '../Header';

import s from './ButtonMainLinks.module.css';

export const ButtonMainLinks = (): ReturnComponentType => {
  return (
    <div className={s.buttonMainLinksContainer}>
      <Button variant="text" className={s.profileBtn}>
        <Link to="/">{HeaderTitle.profile}</Link>
      </Button>
      <Button variant="text" className={s.packsListBtn}>
        <Link to="/list">{HeaderTitle.packsList}</Link>
      </Button>
    </div>
  );
};
