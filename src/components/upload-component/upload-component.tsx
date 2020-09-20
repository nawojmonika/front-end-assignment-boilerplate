import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ChangeEvent, useState } from 'react';

import { UploadButton } from '../upload-button-component/upload-button-component';

const API_URL = 'http://localhost:3000';

export const UploadComponent = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const  onUpload = async (event: ChangeEvent): Promise<void> => {
    setLoading(true)
    const file = (event.target as HTMLInputElement).files?.[0];
    const formData = new FormData();

    if (file !== null && file !== undefined) {
      formData.append( 'image', file);

      const response = await fetch(`${API_URL}/upload-image`, {
        body: formData,
        method: 'POST'
      })

      console.log(response)

    } else {
      setLoading(false)
    }

  }

  return (
  <div className={'upload-component'}>
      {loading ? <CircularProgress /> : null}
      <UploadButton onChange={(event: ChangeEvent): void => onUpload(event)}/>
  </div>
  );
}
