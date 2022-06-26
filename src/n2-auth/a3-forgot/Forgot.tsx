import React from 'react';
import { Formik } from 'formik';
import s from './forgotStyle.module.css';
import { forgotPasswordTC } from './forgot-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';

export const Forgot = () => {
  const isSendMessageToEmail = useSelector<AppRootStateType>(
    state => state.forgot.isSendMessageToEmail,
  );
  const dispatch = useTypedDispatch();

  if (isSendMessageToEmail) {
    return <Navigate to="/login" />;
  } else {
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
            dispatch(forgotPasswordTC(values.email));
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
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={'Email'}
              />
              {errors.email && touched.email && (
                <div style={{ color: 'red' }}>{errors.email}</div>
              )}
              <div>
                Enter your email address and we will send you further instructions
              </div>
              <button type="submit" disabled={isSubmitting}>
                Send Instructions
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
};
