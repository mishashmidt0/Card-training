import * as React from 'react';
import { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import s from '../loginStyle.module.css';

type EyePropsType = {
  setIsShowPass: (isShowPassword: boolean) => void
  isShowPassword: boolean
}

export const Eye:FC<EyePropsType> = React.memo(({ setIsShowPass,isShowPassword } ) => {

  const handleClickShowPassword = useCallback(() => {
    setIsShowPass(!isShowPassword)
  }, [isShowPassword, setIsShowPass]);

  return (
    <InputAdornment position="start" className={s.eye}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
      >
        {isShowPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
});
