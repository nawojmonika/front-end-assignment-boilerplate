import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ChangeEvent, useState } from 'react';

import { IUploadComponentProperties } from './interfaces/IUploadComponentProperties';
import { IUploadImageResponse } from './interfaces/IUploadImageResponse';

const API_URL = 'http://localhost:3000';
const HEIGHT = 300;
const WIDTH = 250;

export const UploadComponent = ({imageElement}: IUploadComponentProperties): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImage] = useState('');

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
      const data: IUploadImageResponse = await response.json();
      setImage(data.data.url);
      setLoading(false);
    } else {
      setLoading(false);
    }

  }

  return (
  <div className={'upload-component'}>
      {loading ? <CircularProgress /> :
      <img  ref={imageElement}
            src={imageUrl}
            hidden={imageUrl.length === 0}
            width={WIDTH}
            height={HEIGHT}
      />}

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
