import React from 'react';
import {Formik} from "formik";
import s from "./loginStyle.module.css"
import {useDispatch} from "react-redux";
import {loginTC} from "./login-reducer";
import {Dispatch} from "redux";
import {Link} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch<Dispatch<any>>()
    return (
        <div className={s.loginContainer}>
            <h1>Игра по карточкам</h1>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    dispatch(loginTC(values))

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
                        <p>Эл. почта или имя пользователя</p>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder={"Эл. почта или имя пользователя"}
                        />
                        {errors.email && touched.email && errors.email}

                        <p>Пароль</p>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder={"Пароль"}
                        />

                        {errors.password && touched.password && errors.password}

                        <div className={s.containerButton}>
                            <div>

                                <label>
                                    <input type="checkbox"
                                           name="rememberMe"
                                           checked={values.rememberMe}
                                           readOnly
                                           onChange={handleChange}
                                    /> Запомнить меня
                                </label>
                                <Link to={"/forgot"} className={s.forgot}>Забыли пароль?</Link>
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Войти
                            </button>
                        </div>

                    </form>
                )}
            </Formik>

        </div>
    );
};

