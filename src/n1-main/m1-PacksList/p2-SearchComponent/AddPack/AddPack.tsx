import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { createCardsPackType } from '../../CardsPacks/cardsPacksAPI';
import { createNewPackTC } from '../../p1-FilterComponent/filter-reducer';
import { AddPackTitle } from '../../p3-enums/enums';

import style from './ButtonPopup.module.css';

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

export const AddPack = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const filter = useAppSelector(state => state.filter);
  const [value, setValue] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setValue('');
  };
  const createPack = (): void => {
    const newPack: createCardsPackType = {
      name: value,
    };

    dispatch(createNewPackTC(newPack, filter));
    handleClose();
    setValue('');
  };

  const changeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create new pack
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
              {AddPackTitle.header}
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
                {AddPackTitle.cancel}
              </Button>
              <Button variant="contained" onClick={createPack}>
                {AddPackTitle.save}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
