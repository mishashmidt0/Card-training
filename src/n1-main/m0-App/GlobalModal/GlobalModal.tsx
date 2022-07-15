import * as React from 'react';
import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import style from './GlobalModal.module.css';

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

type PropsType = {
  children: ReactNode;
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export const GlobalModal: FC<PropsType> = ({
  color,
  variant,
  setOpen,
  open,
  children,
  title,
}) => {
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div>
      {/* <div className={style.Closed} /> */}
      <Button color={color} variant={variant} onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>{children}</Box>
      </Modal>
    </div>
  );
};
