import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../../n4-types';
import { useTypedDispatch } from '../../../../../n5-bll/redux';
import { AddPackTitle } from '../../../p3-enums/enums';
import { createNewCardTC } from '../../cards-reducer';
import { createCardType } from '../../cardsAPI';

import s from './AddCard.module.css';

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

export const AddCard = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();
  const [questionValue, setQuestionValue] = React.useState<string>('');
  const [answerValue, setAnswerValue] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setQuestionValue('');
    setAnswerValue('');
  };

  const createPack = (): void => {
    const newPack: createCardType = {
      cardsPack_id: cardPackId,
      question: questionValue,
      answer: answerValue,
    };
    const payload = { cardsPack_id: cardPackId, page: 1, pageCount: 10 };

    dispatch(createNewCardTC(newPack, payload));

    handleClose();
    setQuestionValue('');
    setAnswerValue('');
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuestionValue(e.target.value);
  };

  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswerValue(e.target.value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create new card
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <div className={s.modalContainer}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {AddPackTitle.header}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Question"
              variant="outlined"
              value={questionValue}
              onChange={changeQuestion}
            />
            <TextField
              id="outlined-basic"
              label="Answer"
              variant="outlined"
              value={answerValue}
              onChange={changeAnswer}
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
