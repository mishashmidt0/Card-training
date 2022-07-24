import { FormikValues } from 'formik';

import { minLength } from '../../../a5-constants/constants';

export const validate = (values: FormikValues): Object => {
  const errors: any = {};

  if (!values.password) {
    errors.password = 'password must be filled';
  }
  if (!!values.password && values.password.length < minLength) {
    errors.password = 'password less than 8 characters';
  }

  return errors;
};
