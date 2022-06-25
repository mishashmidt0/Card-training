import React from "react";
import { Formik } from "formik";
import s from "./registerStyle.module.css";

export const Register = () => {
  return (
    <div className={s.registerContainer}>
      <h1>Регистрация</h1>
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // dispatch(loginTC(values))
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
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder={"Эл. почта или имя пользователя"}
            />
            {errors.email && touched.email && errors.email}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder={"Пароль"}
            />
            <input
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatPassword}
              placeholder={"Повторите пароль"}
            />

            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Отправить
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
