import { FormikValues } from 'formik';

export const validate = (values: FormikValues) => {
  const errors: any = {};

  if (!values.password) {
    errors.password = 'password must be filled';
  }
  if (!!values.password && values.password.length < 8) {
    errors.password = 'password less than 8 characters';
  }
  return errors;
};
