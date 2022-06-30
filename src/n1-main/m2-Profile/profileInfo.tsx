import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const ProfileInfo: FC<EditableSpanPropsType> = React.memo(function({
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
  const eventKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      onChange(title);
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} onKeyPress={eventKey} />
  ) : (
    <span onDoubleClick={activateEditMode}>Name: {value}</span>
  );
});
