import React from 'react';
import { Formik } from 'formik';
import s from './registerStyle.module.css';
import { registerTC } from './register-reducer';
import { AppRootStateType, useTypedDispatch } from '../../n10-bll/redux';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';


export const Register = () => {

  const register = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered);
  const dispatch = useTypedDispatch();

  if (register) {
    return <Navigate to='/login' />;
  } else {
    return (
      <div className={s.registerContainer}>
        <h1>Sing Up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            repeatPassword: '',
          }}

          validate={(values) => {
            const errors: Partial<Omit<{ email: string, password: string, repeatPassword: string }, 'captcha'>> = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
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
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit} className={s.form}>
              <input
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={'Email'}
              />
              {errors.email && touched.email && <div style={{ color: 'red' }}>{errors.email}</div>}
              <input
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder={'Password'}
              />
              {errors.password && touched.password && <div style={{ color: 'red' }}>{errors.password}</div>}
              <input
                type='password'
                name='repeatPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repeatPassword}
                placeholder={'Confirm password'}
              />
              {errors.repeatPassword && touched.repeatPassword && <div style={{ color: 'red' }}>{errors.repeatPassword}</div>}
              <button type='submit' disabled={isSubmitting}>
                REGISTER
              </button>
              Already have an account?
              <Link to={'/login'}>Sing In</Link>
            </form>
          )}
        </Formik>
      </div>
    );
  }

};
