import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import s from '../headerStyle.module.css';
import { Search, SearchIconWrapper, StyledInputBase } from '../utils_SearchAppBar';
import { ButtonLogLink } from './ButtonLogLink';
import { ButtonProfileLink } from './ButtonProfileLink';

export enum HeaderTitle {
  search = 'Search card',
  profile = 'profile',
  packsList = 'packsList',
  login = 'Sign in',
  register = 'Sign on',
  logout = 'Sign Out',
}

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'transparent'}>
        <Toolbar className={s.toolbarContainer}>
          <ButtonProfileLink />

          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={HeaderTitle.search}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <ButtonLogLink />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
