import { Button } from '@material-ui/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference } from 'react';

import { UploadComponent } from '../upload-component/upload-component';
import { IBreedListResponse } from './interfaces/IBreedListResponse';

const BREEDLIST_API = 'https://dog.ceo/api/breeds/list/all';

export const App = (): JSX.Element => {
  // eslint-disable-next-line immutable/no-let
  let model: mobilenet.MobileNet | null = null;
  const breedList: string[] = [];
  const imageElement = useReference<HTMLImageElement>(null);

  const loadModel = async (): Promise<void> => {
    model = await mobilenet.load();
  }

  useEffect((): void => {
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

  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBreedList();
  })


  const startPredictions = async (): Promise<void> => {
    if (model !== null && imageElement.current !== null) {
      const predictions = await model.classify(imageElement.current)
      console.log(predictions);
    }

  }

  return (
    <>
      <UploadComponent imageElement={imageElement}/>
      <Button onClick={async (): Promise<void> => startPredictions()}
              variant="contained"
              color="primary"
              component="span">
        Predict
      </Button>
    </>
  )
}
