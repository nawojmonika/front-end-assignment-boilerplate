import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ChangeEvent, useState } from 'react';

import { UploadButton } from '../upload-button-component/upload-button-component';
import { IUploadComponentProperties } from './interfaces/IUploadComponentProperties';
import { IUploadImageResponse } from './interfaces/IUploadImageResponse';

const API_URL = 'http://localhost:3000';

export const UploadComponent = ({image}: IUploadComponentProperties): JSX.Element => {
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

      setLoading(false)

    } else {
      setLoading(false)
    }

  }

  return (
  <div className={'upload-component'}>
      {loading ? <CircularProgress /> : null}
      {imageUrl.length === 0 ? <img ref={image} src={imageUrl} /> : null}
      <UploadButton onChange={ async (event: ChangeEvent): Promise<void> => onUpload(event)}/>
  </div>
  );
}
