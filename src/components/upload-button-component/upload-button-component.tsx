import Button from '@material-ui/core/Button';
import React from 'react';

import { IUploadButtonProperties } from './interfaces/IUploadButtonProperties';

export const UploadButton = ({onChange}: IUploadButtonProperties): JSX.Element => {
  return (
    <div>
      <input
        accept="image/*"
        hidden={true}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  )
}
