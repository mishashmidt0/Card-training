import React from 'react';
import { loginTC } from '../login-reducer';
import s from '../loginStyle.module.css';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { validate } from './helpers/util-FuncForm';
import { SuperInput } from './SuperInput';
import { Checkbox, FormControlLabel } from '@mui/material';

export const FormikComponent = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <SuperInput
            title={'email or name'}
            name={'email'}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.email}
          />

          {errors.email && touched.email && errors.email}

          <SuperInput
            title={'password'}
            name={'password'}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}

          <div className={s.containerButton}>
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="remember me"
                name={'rememberMe'}
                checked={values.rememberMe}
                onChange={handleChange}
              />

              <Link to={'/forgot'} className={s.forgot}>
                Забыли пароль?
              </Link>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
