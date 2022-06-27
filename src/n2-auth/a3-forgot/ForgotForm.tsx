import React from 'react';
import { Formik } from 'formik';
import s from './forgotStyle.module.css';
import { forgotPasswordTC } from './forgot-reducer';
import { useAppSelector, useTypedDispatch } from '../../n10-bll/redux';
import { SuperInput } from '../a1-login/l1-components/SuperInput';
import { Button } from '@mui/material';


export const ForgotForm = () => {

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
      {({
          values,
          errors,
          handleChange,
          handleSubmit,
        }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <SuperInput
            title={'Email'}
            name={'email'}
            type={'email'}
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

