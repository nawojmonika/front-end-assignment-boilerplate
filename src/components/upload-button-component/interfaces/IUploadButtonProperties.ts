// eslint-disable-next-line unicorn/filename-case
import { ChangeEvent } from 'react';

export interface IUploadButtonProperties {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
