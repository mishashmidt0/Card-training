import React from 'react';
import { loginTC } from '../login-reducer';
import s from '../loginStyle.module.css';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { validate } from './helpers/util-FuncForm';
import { SuperInput } from './SuperInput';
import { LoginFooter } from './LoginFooter';
import { ErrorMessage } from './ErrorMessage';

export enum TitleFormik {
  email = 'email',
  emailTitle = 'email or name',
  password = 'password',
  passwordTitle = 'password',
  rememberMe = 'rememberMe',
  initEmail = 'nya-admin@nya.nya',
  initPassword = '1qazxcvBG',
}

export const FormikComponent = () => {
  const dispatch = useDispatch<Dispatch<any>>();

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
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <SuperInput
            title={TitleFormik.emailTitle}
            name={TitleFormik.email}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.email}
            error={!!errors.email}
          />

          <ErrorMessage message={errors.email} />

          <SuperInput
            title={TitleFormik.passwordTitle}
            name={TitleFormik.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.password}
            error={!!errors.password}
          />
          <ErrorMessage message={errors.password} />

          <LoginFooter
            value={values.rememberMe}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
};
