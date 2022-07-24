import { FormikValues } from 'formik';

import { minLength } from '../../../a5-constants/constants';

export const validate = (values: FormikValues): {} => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'email must be filled';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'password must be filled';
  }
  if (!!values.password && values.password.length < minLength) {
    errors.password = 'password less than 8 characters';
  }

  return errors;
};
