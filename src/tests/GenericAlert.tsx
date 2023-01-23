import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IAlert from '../models/IAlert';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/app-state';
import { ActionType } from '../redux/action-type';


function GenericAlert() {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const dispatch = useDispatch();

  const lestener: boolean = useSelector((state: AppState) => state.showAlert);

  const alertValue: IAlert = useSelector((state: AppState) => state.alertValue);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: ActionType.CloseAlert })
  };

  return (
    <div>
      {/* <button className='button-test' style={{background: "red", height:"100px", width:"100px"}} onClick={() => onClick()} >test</button> */}
      {/* <Stack spacing={2} sx={{ width: '100%' }}> */}
      {/* <Button variant="outlined" onClick={handleClick}> */}
      {/* Open success snackbar */}
      {/* </Button> */}
      <Snackbar open={lestener} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertValue.type} sx={{ width: '100%' }}>
          {alertValue.text}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      {/* </Stack> */}
    </div>
  )
}

export default GenericAlert