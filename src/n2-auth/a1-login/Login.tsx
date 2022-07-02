import React from 'react';
import s from './LoginStyle.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import { validate } from './l1-components/helpers/util-validate-FuncForm';
import { loginTC } from './login-reducer';
import { SuperInput } from './l1-components/SuperInput';
import { LoginFooter } from './l1-components/LoginFooter';

export enum TitleFormik {
  email = 'email',
  emailTitle = 'email',
  password = 'password',
  passwordTitle = 'password',
  rememberMe = 'rememberMe',
  initEmail = '',
  initPassword = '',
  text = 'text',
}

export const Login = () => {

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);

  const dispatch = useTypedDispatch();

  if (isLoggedIn) return <Navigate to='/profile' />;

  return (
    <div className={s.loginContainer}>
      <h1>Sign In</h1>
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
        {({ values, errors, handleChange, handleSubmit }) => (
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
    </div>
  );
};
