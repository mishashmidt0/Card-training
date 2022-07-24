import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector } from '../../../n5-bll/redux';
import { TitleFormik } from '../Login';
import s from '../LoginStyle.module.css';

type LoginFooterType = {
  value: boolean;
  handleChange: any;
};

export const LoginFooter: FC<LoginFooterType> = ({
  value,
  handleChange,
}: LoginFooterType): ReturnComponentType => {
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

        <Link to="/forgot" className={s.forgot}>
          {Title.forgot}
        </Link>
      </div>

      <Button variant="contained" type="submit" disabled={loading}>
        {Title.button}
      </Button>
    </div>
  );
};
