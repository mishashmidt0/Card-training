import React, { FC } from 'react';
import s from '../loginStyle.module.css';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { TitleFormik } from './Formik';

type LoginFooterType = {
  value: boolean,
  handleChange: any
  isSubmitting: boolean
}

export const LoginFooter: FC<LoginFooterType> = ({ value, handleChange, isSubmitting }) => {
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

        />

        <Link to={'/forgot'} className={s.forgot}>{Title.forgot}</Link>
      </div>

      <Button variant='contained' type='submit' disabled={isSubmitting}>{Title.button}</Button>
    </div>

  );
};

