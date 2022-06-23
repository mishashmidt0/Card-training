import React from 'react';
import {Formik} from "formik";
import s from "./loginStyle.module.css"
import {useDispatch} from "react-redux";
import {loginTC} from "./login-reducer";
import {Dispatch} from "redux";

export const Login = () => {
    const dispatch = useDispatch<Dispatch<any>>()
    return (
        <div className={s.loginContainer}>
            <h1>Please log in!</h1>
            <Formik
                initialValues={{email: 'nya-admin@nya.nya', password: '1qazxcvBG', rememberMe: false}}
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
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}

                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />

                        {errors.password && touched.password && errors.password}
                        <label>
                            <input type="checkbox"
                                   name="rememberMe"
                                   checked={values.rememberMe}
                                   readOnly
                                   onChange={handleChange}
                            /> remember me
                        </label>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </form>
                )}
            </Formik>

        </div>
    );
};

