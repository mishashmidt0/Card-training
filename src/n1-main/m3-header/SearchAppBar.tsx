import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import s from './headerStyle.module.css';
import {Search, SearchIconWrapper, StyledInputBase} from './utils_SearchAppBar';
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../n10-bll/redux";
import {logoutTC} from "../m2-Profile/profile-reducer";

export default function SearchAppBar() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
    const dispatch = useTypedDispatch();

    enum Title {
        search = 'Search card',
        profile = 'profile',
        packsList = 'packsList',
        login = 'Log in',
        register = 'Sign on',
        logout = 'Log Out'
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={'transparent'}>
                <Toolbar className={s.toolbarContainer}>
                    <div>
                        <Button variant="text">
                            <Link to={'/'}>{Title.profile}</Link>
                        </Button>
                        <Button variant="text">
                            {' '}
                            <Link to={'/list'}>{Title.packsList}</Link>
                        </Button>
                    </div>
                    <div>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={Title.search}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>

                        { isLoggedIn &&
                            <Button onClick={() => dispatch(logoutTC())} variant="text">
                          {Title.logout}
                        </Button>
                        }

                      { !isLoggedIn &&
                          <>
                            <Button variant="text">
                              {' '}
                              <Link to={'/login'}>{Title.login}</Link>
                            </Button>
                            <Button variant="text">
                              {' '}
                              <Link to={'/register'}>{Title.register}</Link>
                            </Button>
                          </>
                          }


                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
