import * as React from 'react';
import { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import s from '../loginStyle.module.css';
import { useAppSelector, useTypedDispatch } from '../../../n10-bll/redux';
import { changeShowPassword } from '../login-reducer';

export const Eye = React.memo(() => {
  const isShowPassword = useAppSelector(state => state.login.isShowPassword);
  const dispatch = useTypedDispatch();

  const handleClickShowPassword = useCallback(() => {
    dispatch(changeShowPassword(!isShowPassword));
  }, [isShowPassword]);

  return (
    <InputAdornment position="start" className={s.eye}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        // onMouseDown={handleMouseDownPassword}
      >
        {isShowPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
});
