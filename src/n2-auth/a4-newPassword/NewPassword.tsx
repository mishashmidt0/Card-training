import React from 'react';
import s from './newPasswordStyle.module.css';
import { NewPasswordFormikComponent } from './n1-components/newPasswordFormik';

export const NewPassword = () => {
  return (
    <div className={s.newPasswordContainer}>
      <h1>Create new password</h1>
      <NewPasswordFormikComponent />
    </div>
  );
};

