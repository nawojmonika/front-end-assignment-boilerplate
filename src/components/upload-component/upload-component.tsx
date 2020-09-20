import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ChangeEvent, useState } from 'react';

import { UploadButton } from '../upload-button-component/upload-button-component';

export const UploadComponent = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const onUpload = (event: ChangeEvent): void => {
    setLoading(true)
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file)
  }

  return (
  <div className={'upload-component'}>
      {loading ? <CircularProgress /> : null}
      <UploadButton onChange={(event: ChangeEvent): void => onUpload(event)}/>
  </div>
  );
}
