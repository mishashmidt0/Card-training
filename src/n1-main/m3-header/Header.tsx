import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { ReturnComponentType } from '../../n4-types';

import { ButtonAuthLinks } from './components/ButtonAuthLinks';
import { ButtonMainLinks } from './components/ButtonMainLinks';
import { Linear } from './components/Linear';
import s from './HeaderStyle.module.css';

export enum HeaderTitle {
  profile = 'Profile',
  packsList = 'PacksList',
  login = 'Sign In',
  register = 'Sign Up',
  logout = 'Sign Out',
}

export const Header = (): ReturnComponentType => {
  return (
    <div className={s.headerContainer}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar className={s.toolbarContainer}>
            <ButtonMainLinks />
            <div>
              <ButtonAuthLinks />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Linear />
    </div>
  );
};
