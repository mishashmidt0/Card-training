import React, { FC, useCallback, useState } from 'react';

import TextField from '@mui/material/TextField';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector } from '../../../n5-bll/redux';
import { TitleFormik } from '../Login';

import { ErrorMessage } from './ErrorMessage';
import { Eye } from './Eye';

type SuperInputType = {
  title: string;
  name: string;
  type: string;
  handleChange: any;
  value: any;
  error: any;
};

export const SuperInput: FC<SuperInputType> = React.memo(
  ({
    title,
    type,
    name,
    handleChange,
    value,
    error,
  }: SuperInputType): ReturnComponentType => {
    const loading = useAppSelector(state => state.app.loading);
    const [isShowPassword, setIsShowPass] = useState<boolean>(false);

    let floatingType = type;

    if (isShowPassword && type === TitleFormik.password) {
      floatingType = TitleFormik.text;
    }

    const [err, setErr] = useState<boolean>(false);
    const isError = useCallback(() => {
      setErr(!!error);
    }, [error]);

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
        {type === TitleFormik.password && (
          <Eye setIsShowPass={setIsShowPass} isShowPassword={isShowPassword} />
        )}

        <ErrorMessage message={error} isActive={err} />
      </div>
    );
  },
);
