import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';

import { IErrorComponentProperties } from './interfaces/IErrorComponentProperties';

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
    <Snackbar className={"error-component"} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert className={"error-component--message"} onClose={handleClose} severity="error">
        { message }
      </Alert >
    </Snackbar>
  );
}