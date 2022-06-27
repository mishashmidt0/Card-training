import React from 'react';
import { Formik } from 'formik';
import s from './registerStyle.module.css';
import { registerTC } from './register-reducer';
import { useTypedDispatch } from '../../n10-bll/redux';
import { Link } from 'react-router-dom';
import { SuperInput } from '../a1-login/l1-components/SuperInput';
import { Button } from '@mui/material';

export const RegisterForm = () => {

  const dispatch = useTypedDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        repeatPassword: '',
      }}
      validate={values => {
        const errors: Partial<Omit<{ email: string; password: string; repeatPassword: string }, 'captcha'>> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 8) {
          errors.password = 'The password must be more than 8 characters';
        }
        if (values.repeatPassword !== values.password) {
          errors.repeatPassword = 'Password does not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(registerTC({ email: values.email, password: values.password }));
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
          <SuperInput
            title={'Password'}
            name={'password'}
            type={'password'}
            handleChange={handleChange}
            value={values.password}
            error={errors.password}
          />
          {errors.password && touched.password && (
            <div style={{ color: 'red' }}>{errors.password}</div>
          )}
          <SuperInput
            title={'Confirm password'}
            name={'repeatPassword'}
            type={'password'}
            handleChange={handleChange}
            value={values.repeatPassword}
            error={errors.repeatPassword}
          />
          {errors.repeatPassword && touched.repeatPassword && (
            <div style={{ color: 'red' }}>{errors.repeatPassword}</div>
          )}
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            REGISTER
          </Button>
          Already have an account?
          <Link to={'/login'}>Sing In</Link>
        </form>
      )}
    </Formik>
  );
};

