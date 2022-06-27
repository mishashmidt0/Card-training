import React from 'react';
import { Formik } from 'formik';
import s from './forgotStyle.module.css';
import { forgotPasswordTC } from './forgot-reducer';
import { useTypedDispatch } from '../../n10-bll/redux';
import { SuperInput } from '../a1-login/l1-components/SuperInput';
import { Button } from '@mui/material';


export const ForgotForm = () => {

  const dispatch = useTypedDispatch();

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
          touched,
          handleChange,
          //handleBlur,
          handleSubmit,
          isSubmitting,
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
          {errors.email && touched.email && (
            <div style={{ color: 'red' }}>{errors.email}</div>
          )}
          <div className={s.form_description}>
            Enter your email address and we will send you further instructions
          </div>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Send Instructions
          </Button>
        </form>
      )}
    </Formik>
  );
};

