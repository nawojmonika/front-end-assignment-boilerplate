// SCSS imported here will be bundled by webpack
import './index.scss';
import './components/upload-component/upload-component.scss'
// You can import any components here
import './components/my-component/my-component';

import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const BREEDLIST_API = 'https://dog.ceo/api/breeds/list/all';


import { UploadComponent } from './components/upload-component/upload-component';
import { IBreedListMessageChild, IBreedListResponse } from './components/interfaces/IBreedListResponse';

export const App = (): JSX.Element => {
  let model: mobilenet.MobileNet;
  const breedList: Array<string> = [];

  const loadModel = async (): Promise<void> => {
    model = await mobilenet.load();
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadModel()
  })

  const loadBreedList = async (): Promise<void> => {
    const response = await fetch(`${BREEDLIST_API}`, {
      method: 'GET'
    });
    const data: IBreedListResponse = await response.json();
    const breedData = data.message;
    Object.keys(breedData).forEach((breedKey: string): void => {
      if (breedData[breedKey].length > 0) {
        breedData[breedKey].forEach((name: string): void => {
          breedList.push(`${breedKey} ${name}`);
        })
      } else {
        breedList.push(breedKey);
      }
    });
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBreedList();
  })

  const startPredictions = async (image: HTMLImageElement): Promise<void> => {
    const predictions = await model.classify(image)
    console.log(predictions);
  }

  return (
    <UploadComponent startPredictions={startPredictions}/>
  )
}

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(App), domContainer);
