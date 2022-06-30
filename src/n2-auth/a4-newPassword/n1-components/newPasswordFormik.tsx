import React from 'react';
import s from '../newPasswordStyle.module.css';
import { Formik } from 'formik';
import { validate } from './helpers/util-newPassword-Form';
import { SuperInput } from '../../a1-login/l1-components/SuperInput';
import Button from '@mui/material/Button';
import { useAppSelector, useTypedDispatch } from '../../../n10-bll/redux';
import { createNewPassword } from '../newPassword-reducer';
import { useParams } from 'react-router-dom';

export enum TitleFormik {
  password = 'password',
  passwordTitle = 'password',
  initPassword = '',
  button = 'create new password',
}

export const NewPasswordFormikComponent = () => {
  const loading = useAppSelector(state => state.app.loading);
  const dispatch = useTypedDispatch();
  const { token } = useParams();

  return (
    <Formik
      initialValues={{
        password: TitleFormik.initPassword,
        repeatPassword: TitleFormik.initPassword,
      }}
      validate={values => validate(values)}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(
          createNewPassword({
            password: values.password,
            resetPasswordToken: token as string,
          }),
        );
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <SuperInput
            title={TitleFormik.passwordTitle}
            name={TitleFormik.password}
            type={TitleFormik.password}
            handleChange={handleChange}
            value={values.password}
            error={errors.password}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {TitleFormik.button}
          </Button>
        </form>
      )}
    </Formik>
  );
};
