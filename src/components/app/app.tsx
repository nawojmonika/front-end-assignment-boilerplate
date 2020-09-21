import { Button } from '@material-ui/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import { UploadComponent } from '../upload-component/upload-component';
import { IBreedListResponse } from './interfaces/IBreedListResponse';
import { IPrediction } from './interfaces/IPrediction';

const BREEDLIST_API = 'https://dog.ceo/api/breeds/list/all';

export const App = (): JSX.Element => {
  const [currentBreedName, setBreedName] = useState('');
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
          breedList.push(`${breedKey.toLowerCase()} ${name.toLowerCase()}`);
        })
      } else {
        breedList.push(breedKey.toLowerCase());
      }
    });
  }

  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBreedList();
  })

  const isADogBreed = (name: string, breedNameList: string[]): boolean => {
    return breedNameList.includes(name.toLowerCase());
  }

  const isPredictionABreedName = (prediction: IPrediction): boolean => {
    const names = prediction.className.split(',');

    return names.find((name: string): boolean => isADogBreed(name.trim(), breedList)) !== undefined;
  }


  const startPredictions = async (): Promise<void> => {
    if (model !== null && imageElement.current !== null) {
      const predictions = await model.classify(imageElement.current)
      const breedNamePrediction = predictions.find(isPredictionABreedName);

      if (breedNamePrediction !== undefined) {
        const {className}  = breedNamePrediction;
        const breedNames = className.split(',');
        const breedName = breedNames.find((name: string): boolean => isADogBreed(name.trim(), breedList));

        if (breedName !== undefined) {
          setBreedName(breedName);
        }
      }
    }

  }

  return (
    <>
      <h3>{currentBreedName.toUpperCase()}</h3>
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
