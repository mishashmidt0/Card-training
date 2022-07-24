import React from 'react';

import { Button } from '@mui/material';
import { Formik } from 'formik';
import { Navigate } from 'react-router-dom';

import { ReturnComponentType } from '../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../n5-bll/redux';
import { SuperInput } from '../a1-login/l1-components/SuperInput';

import { sendMessageForMailTC } from './forgot-reducer';
import s from './ForgotStyle.module.css';

export const Forgot = (): ReturnComponentType => {
  const isSendMessageToEmail = useAppSelector(state => state.forgot.isSendMessageToEmail);
  const loading = useAppSelector(state => state.app.loading);
  const dispatch = useTypedDispatch();

  if (isSendMessageToEmail) return <Navigate to="/login" />;

  return (
    <div className={s.forgotContainer}>
      <h1>Forgot your password?</h1>
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors: any = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          dispatch(sendMessageForMailTC(values.email));
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={s.forgotFormContainer}>
            <SuperInput
              title="Email"
              name="email"
              type="email"
              handleChange={handleChange}
              value={values.email}
              error={errors.email}
            />
            <div className={s.form_description}>
              Enter your email address and we will send you further instructions
            </div>
            <Button variant="contained" type="submit" disabled={loading}>
              Send Instructions
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
