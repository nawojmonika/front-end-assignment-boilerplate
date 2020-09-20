// SCSS imported here will be bundled by webpack
import './index.scss';
import './components/upload-component/upload-component.scss'
// You can import any components here
import './components/my-component/my-component';

import React, { createRef as createReference, RefObject as ReferenceObject } from 'react';
import ReactDOM from 'react-dom';

import { UploadComponent } from './components/upload-component/upload-component';

export const App = (): JSX.Element => {
  const image: ReferenceObject<HTMLImageElement> = createReference();

  return (
    <UploadComponent image={image}/>
  )
}

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(App), domContainer);
