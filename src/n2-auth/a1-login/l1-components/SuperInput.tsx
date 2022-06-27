import React, { FC, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppSelector } from '../../../n10-bll/redux';
import { ErrorMessage } from './ErrorMessage';
import { Eye } from './Eye';
import { TitleFormik } from './Login-Formik';

type SuperInputType = {
  title: string;
  name: string;
  type: string;
  handleChange: any;
  value: any;
  error: any;
};

export const SuperInput: FC<SuperInputType> = React.memo(
  ({ title, type, name, handleChange, value, error }) => {
    const loading = useAppSelector(state => state.app.loading);
    const isShowPassword = useAppSelector(state => state.login.isShowPassword);

    let floatingType = type;
    if (isShowPassword && type === TitleFormik.password) {
      floatingType = TitleFormik.text;
    }

    const [err, setErr] = useState<boolean>(false);
    const isError = useCallback(() => {
      setErr(!!error);
    }, [value]);

    return (
      <div>
        <TextField
          label={title}
          variant="standard"
          type={floatingType}
          name={name}
          onChange={handleChange}
          onBlur={isError}
          onFocus={() => setErr(false)}
          value={value}
          error={err}
          disabled={loading}
        />
        {type === TitleFormik.password && <Eye />}

        <ErrorMessage message={error} isActive={err} />
      </div>
    );
  },
);
