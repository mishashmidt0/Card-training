import React from 'react';
import { Formik } from 'formik';
import s from './RegisterFormStyle.module.css';
import { registerTC } from '../register-reducer';
import { useAppSelector, useTypedDispatch } from '../../../n10-bll/redux';
import { Link } from 'react-router-dom';
import { SuperInput } from '../../a1-login/l1-components/SuperInput';
import { Button } from '@mui/material';

export const RegisterForm = () => {
  const dispatch = useTypedDispatch();
  const loading = useAppSelector(state => state.app.loading);

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
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={s.formContainer}>
          <SuperInput
            title={'Email'}
            name={'email'}
            type={'email'}
            handleChange={handleChange}
            value={values.email}
            error={errors.email}
          />
          <SuperInput
            title={'Password'}
            name={'password'}
            type={'password'}
            handleChange={handleChange}
            value={values.password}
            error={errors.password}
          />
          <SuperInput
            title={'Confirm password'}
            name={'repeatPassword'}
            type={'password'}
            handleChange={handleChange}
            value={values.repeatPassword}
            error={errors.repeatPassword}
          />
          <Button variant='contained' type='submit' disabled={loading} className={s.button}>
            REGISTER
          </Button>
          <div className={s.description}>
            Already have an account?
          </div>
          <div className={s.link}>
            <Link to={'/login'}>Sing In</Link>
          </div>
        </form>
      )}
    </Formik>
  );
};
