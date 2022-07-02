import React from 'react';

import { Button } from '@mui/material';
import { Formik } from 'formik';

import { useAppSelector, useTypedDispatch } from '../../../n10-bll/redux';
import { ReturnComponentType } from '../../../n4-types';
import { SuperInput } from '../../a1-login/l1-components/SuperInput';
import { forgotPasswordTC } from '../forgot-reducer';

import s from './ForgotFormStyle.module.css';

export const ForgotForm = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const loading = useAppSelector(state => state.app.loading);

  return (
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
        dispatch(forgotPasswordTC(values.email));
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
  );
};
