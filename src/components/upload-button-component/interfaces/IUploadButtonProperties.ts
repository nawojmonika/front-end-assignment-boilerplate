import { ChangeEvent } from 'react';

export interface IUploadButtonProperties {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
