import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../../n4-types';
import { useTypedDispatch } from '../../../../../n5-bll/redux';
import { NewPackTitle } from '../../../p3-enums/enums';
import { changeCardTC } from '../../cards-reducer';

import style from './NewCardNamesBtn.module.css';

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

export const NewCardNamesBtn = ({
  question,
  answer,
  cardId,
  loading,
}: NewCardPackNamePropsType): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();

  const [questionValue, setQuestionValue] = React.useState<string>(question);
  const [answerValue, setAnswerValue] = React.useState<string>(answer);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
  };
  const changeCardPackName = (): void => {
    dispatch(changeCardTC(cardId, questionValue, answerValue, cardPackId!));
    handleClose();
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuestionValue(e.target.value);
  };
  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswerValue(e.target.value);
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
  cardId: string;
  loading: boolean;
  question: string;
  answer: string;
};
