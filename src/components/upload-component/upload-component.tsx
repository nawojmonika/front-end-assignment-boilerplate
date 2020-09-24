import Button from '@material-ui/core/Button';
import React, { ChangeEvent, useState } from 'react';

import { uploadPicture } from '../../utils/local-api-utils/local-api-utils';
import { ErrorComponent } from '../error-component/error-component';
import { IUploadComponentProperties } from './interfaces/IUploadComponentProperties';

const ERROR_MESSAGE = 'Sorry! Couldn\'t upload the picture!';

export const UploadComponent = ({ setImageSrc, setLoading }: IUploadComponentProperties): JSX.Element => {
  const [error, setError] = useState(false);

  const onUpload = async (event: ChangeEvent): Promise<void> => {
    setLoading(true);
    const file = (event.target as HTMLInputElement).files?.[0];
    const formData = new FormData();

    if (file !== null && file !== undefined) {
      formData.append('image', file);

      try {
        const imageUrl = await uploadPicture(formData);
        setImageSrc(imageUrl);
        setLoading(false);
      } catch (error_) {
        setError(true);
        setLoading(false);
      }

    } else {
      setLoading(false);
    }
  };

  const handleInputChange = async (event: ChangeEvent): Promise<void> => {
    await onUpload(event);
  }

  const handleErrorClose = (): void => {
    setError(false);
  }

  return (
    <div className={'upload-component'}>
      {error ?
        <ErrorComponent message={ERROR_MESSAGE} onClose={handleErrorClose}/>
        : null
      }
      <input accept="image/*"
             hidden={true}
             id="contained-button-file"
             multiple
             type="file"
             onChange={handleInputChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload a photo
        </Button>
      </label>
    </div>
  );
};
