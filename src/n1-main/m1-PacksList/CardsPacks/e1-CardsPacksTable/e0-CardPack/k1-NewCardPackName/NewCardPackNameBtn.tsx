import * as React from 'react';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ReturnComponentType } from '../../../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../../../n5-bll/redux';
import { ProfileStateType } from '../../../../../m2-Profile/profile-reducer';
import { NewPackTitle } from '../../../../p3-enums/enums';
import { changeCardPackNameTC } from '../../../cardsPacks-reducer';

import style from './NewButtonPopup.module.css';

const styleBox = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const NewCardPackNameBtn = ({
  cardPackId,
  loading,
}: NewCardPackNamePropsType): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const filter = useAppSelector(state => state.filter);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

  const [value, setValue] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setValue('');
  };
  const changeCardPackName = useCallback((): void => {
    dispatch(changeCardPackNameTC(cardPackId, value, filter));
    handleClose();
    setValue('');
  }, [cardPackId, filter, userId, value]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <span>
      <Button variant="contained" onClick={handleOpen} disabled={loading}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <div className={style.modalContainer}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {NewPackTitle.header}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Name pack"
              variant="outlined"
              value={value}
              onChange={changeText}
            />
            <div>
              <Button variant="contained" onClick={handleClose}>
                {NewPackTitle.cancel}
              </Button>
              <Button variant="contained" onClick={changeCardPackName}>
                {NewPackTitle.save}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </span>
  );
};

type NewCardPackNamePropsType = {
  cardPackId: string;
  loading: boolean;
};
