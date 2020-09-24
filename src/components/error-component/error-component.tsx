import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';

import { IErrorComponentProperties } from './interfaces/IErrorComponentProperties';
const AUTO_CLOSE = 6000;

export const ErrorComponent = ({message, onClose}: IErrorComponentProperties):JSX.Element => {
  const [open, setOpen] = React.useState(false);

  useEffect((): void => {
    setOpen(true);
  });

  const handleClose = (): void => {
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar className={"error-component"} open={open} autoHideDuration={AUTO_CLOSE} onClose={handleClose}>
      <Alert className={"error-component--message"} onClose={handleClose} severity="error">
        { message }
      </Alert >
    </Snackbar>
  );
}
