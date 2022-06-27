import React from 'react';
import { loginTC } from '../login-reducer';
import s from '../loginStyle.module.css';
import { Formik } from 'formik';
import { validate } from './helpers/util-FuncForm';
import { SuperInput } from './SuperInput';
import { LoginFooter } from './LoginFooter';
import { useTypedDispatch } from '../../../n10-bll/redux';

export enum TitleFormik {
  email = 'email',
  emailTitle = 'email or name',
  password = 'password',
  passwordTitle = 'password',
  rememberMe = 'rememberMe',
  initEmail = '',
  initPassword = '',
  text = 'text',
}

export const LoginFormikComponent = () => {
  const dispatch = useTypedDispatch();

  return (
    <Formik
      initialValues={{
        email: TitleFormik.initEmail,
        password: TitleFormik.initPassword,
        rememberMe: false,
      }}
      validate={values => validate(values)}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        dispatch(loginTC(values));
      }}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <SuperInput
            title={TitleFormik.emailTitle}
            name={TitleFormik.email}
            type={TitleFormik.email}
            handleChange={handleChange}
            value={values.email}
            error={errors.email}
          />
          <SuperInput
            title={TitleFormik.passwordTitle}
            name={TitleFormik.password}
            type={TitleFormik.password}
            handleChange={handleChange}
            value={values.password}
            error={errors.password}
          />
          <LoginFooter value={values.rememberMe} handleChange={handleChange} />
        </form>
      )}
    </Formik>
  );
};
