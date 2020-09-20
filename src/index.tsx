// SCSS imported here will be bundled by webpack
import './index.scss';
import './components/upload-component/upload-component.scss'
// You can import any components here
import './components/my-component/my-component';

import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { UploadComponent } from './components/upload-component/upload-component';

export const App = (): JSX.Element => {
  let model: mobilenet.MobileNet;

  const loadModel = async (): Promise<void> => {
    model = await mobilenet.load();
  }

  const startPredictions = async (image: HTMLImageElement): Promise<void> => {
    const predictions = await model.classify(image)
    console.log(predictions);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadModel()
  })

  return (
    <UploadComponent startPredictions={startPredictions}/>
  )
}

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(App), domContainer);
