import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AlertProps, Snackbar } from '@mui/material';
import { closeAnswer, snackbarType } from '../../app-reducer';
import { AppRootStateType } from '../../../n10-bll/redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Snackbars() {
  const dispatch = useDispatch();
  const snackbar = useSelector<AppRootStateType, snackbarType>(
    state => state.app.snackbar,
  );

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAnswer());
  };

  return (
    <Snackbar
      open={snackbar.isShow}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={snackbar.status} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
