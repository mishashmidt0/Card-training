import React, { ChangeEvent, FC, useState } from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const ProfileInfo: FC<EditableSpanPropsType> = React.memo(function ({
  value,
  onChange,
}) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>Name: {value}</span>
  );
});
