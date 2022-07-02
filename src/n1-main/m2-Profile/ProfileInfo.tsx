import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react';

import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const ProfileInfo: FC<EditableSpanPropsType> = React.memo(
  ({ value, onChange }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = (): void => {
      setEditMode(true);
      setTitle(value);
    };
    const activateViewMode = (): void => {
      setEditMode(false);
      onChange(title);
    };
    const eventKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        setEditMode(false);
        onChange(title);
      }
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    return editMode ? (
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
        onKeyPress={eventKey}
      />
    ) : (
      <span onDoubleClick={activateEditMode}>Name: {value}</span>
    );
  },
);
