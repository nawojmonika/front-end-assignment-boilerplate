import Button from '@material-ui/core/Button';
import React, { ChangeEvent } from 'react';

import { IUploadComponentProperties } from './interfaces/IUploadComponentProperties';
import { IUploadImageResponse } from './interfaces/IUploadImageResponse';

const API_URL = 'http://localhost:3000';

export const UploadComponent = ({setImageSrc, setLoading}: IUploadComponentProperties): JSX.Element => {
  const onUpload = async (event: ChangeEvent): Promise<void> => {
    setLoading(true);
    const file = (event.target as HTMLInputElement).files?.[0];
    const formData = new FormData();

    if (file !== null && file !== undefined) {
      formData.append( 'image', file);

      const response = await fetch(`${API_URL}/upload-image`, {
        body: formData,
        method: 'POST'
      })

      const data: IUploadImageResponse = await response.json();
      setImageSrc(data.data.url);
      setLoading(false);
    } else {
      setLoading(false);
    }

  }

  return (
  <div className={'upload-component'}>
    <input accept="image/*"
           hidden={true}
           id="contained-button-file"
           multiple
           type="file"
           onChange={async (event: ChangeEvent): Promise<void> => onUpload(event)}
    />
    <label htmlFor="contained-button-file">
      <Button variant="contained" color="primary" component="span">
        Upload
      </Button>
    </label>
  </div>
  );
}
