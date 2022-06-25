import React from 'react';
import s from './loginStyle.module.css';
import { FormikComponent } from './l1-components/Formik';

export const Login = () => {
  return (
    <div className={s.loginContainer}>
      <h1>Log in</h1>
      <FormikComponent />
    </div>
  );
};
