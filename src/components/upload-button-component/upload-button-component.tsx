import Button from '@material-ui/core/Button';
import React from 'react';


export const UploadButton = (): JSX.Element => {
  return (
    <div>
      <input
        accept="image/*"
        hidden={true}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  )
}
