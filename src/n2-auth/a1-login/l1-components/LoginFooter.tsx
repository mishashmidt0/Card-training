import React, { FC } from 'react';
import s from '../LoginStyle.module.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../n10-bll/redux';
import { TitleFormik } from '../Login';

type LoginFooterType = {
  value: boolean;
  handleChange: any;
};

export const LoginFooter: FC<LoginFooterType> = ({ value, handleChange }) => {
  const loading = useAppSelector(state => state.app.loading);

  enum Title {
    checkbox = 'remember me',
    button = 'Log in',
    forgot = 'Forgotten?',
  }

  return (
    <div className={s.containerFooter}>
      <div>
        <FormControlLabel
          control={<Checkbox checked={value} />}
          label={Title.checkbox}
          name={TitleFormik.rememberMe}
          onChange={handleChange}
          disabled={loading}
        />

        <Link to={'/forgot'} className={s.forgot}>
          {Title.forgot}
        </Link>
      </div>

      <Button variant="contained" type="submit" disabled={loading}>
        {Title.button}
      </Button>
    </div>
  );
};