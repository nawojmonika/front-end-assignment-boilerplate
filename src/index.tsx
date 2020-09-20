// CSS imported here will be bundled by webpack
import './index.css';
// You can import any components here
import './components/my-component/my-component';

import React from 'react';

import { UploadComponent } from './components/upload-component/upload-component';

export const App = (): JSX.Element => {
  return (
    <UploadComponent/>
  )
}
