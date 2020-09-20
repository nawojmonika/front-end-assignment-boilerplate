// CSS imported here will be bundled by webpack
import './index.scss';
// You can import any components here
import './components/my-component/my-component';

import React from 'react';
import ReactDOM from 'react-dom';

import { UploadComponent } from './components/upload-component/upload-component';

export const App = (): JSX.Element => {
  return (
    <UploadComponent/>
  )
}

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(App), domContainer);
