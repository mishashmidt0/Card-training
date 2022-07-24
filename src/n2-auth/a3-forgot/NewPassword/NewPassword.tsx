import React from 'react';

import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { Navigate, useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { SuperInput } from '../../a1-login/l1-components/SuperInput';
import { createNewPassword } from '../forgot-reducer';

import { validate } from './helpers/util-newPassword-Form';
import s from './newPasswordStyle.module.css';

export enum TitleFormik {
  password = 'password',
  passwordTitle = 'password',
  initPassword = '',
  button = 'create new password',
}

export const NewPassword = (): ReturnComponentType => {
  const isCreate = useAppSelector(state => state.forgot.isCreate);
  const loading = useAppSelector(state => state.app.loading);
  const dispatch = useTypedDispatch();
  const { token } = useParams();

  if (isCreate) return <Navigate to="/login" />;

  return (
    <div className={s.newPasswordContainer}>
      <h1>Create new password</h1>
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
    </div>
  );
};
