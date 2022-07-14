import * as React from 'react';
import { FC } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../../n4-types';
import { useTypedDispatch } from '../../../../../n5-bll/redux';
import { GlobalModal } from '../../../../m0-App/GlobalModal/GlobalModal';
import { AddPackTitle } from '../../../p3-enums/enums';
import { removeCardTC } from '../../cards-reducer';

import s from './DeleteCardBtn.module.css';

type PropsType = {
  cardId: string;
};

export const DeleteCardBtn: FC<PropsType> = ({ cardId }): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleClose = (): void => {
    setOpen(false);
  };

  const removeCard = (): void => {
    const payload = { cardsPack_id: cardPackId, page: 1, pageCount: 10 };

    dispatch(removeCardTC(cardId, payload));

    handleClose();
  };

  return (
    <GlobalModal
      variant="contained"
      color="error"
      title="Delete"
      open={open}
      setOpen={setOpen}
    >
      <div className={s.modalContainer}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete card
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove this card?
        </Typography>
        <div>
          <Button variant="contained" onClick={handleClose}>
            {AddPackTitle.cancel}
          </Button>
          <Button variant="contained" color="error" onClick={removeCard}>
            Delete
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
};
