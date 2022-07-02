import React from 'react';
import s from './HeaderStyle.module.css';
import { Linear } from './components/Linear';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ButtonMainLinks } from './components/ButtonMainLinks';
import { ButtonAuthLinks } from './components/ButtonAuthLinks';

export enum HeaderTitle {
  profile = 'Profile',
  packsList = 'PacksList',
  login = 'Sign In',
  register = 'Sign Up',
  logout = 'Sign Out',
}

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color={'transparent'}>
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
