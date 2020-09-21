import { Button } from '@material-ui/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import { UploadComponent } from '../upload-component/upload-component';
import { IBreedList, IBreedListResponse } from './interfaces/IBreedListResponse';
import { IPrediction } from './interfaces/IPrediction';

const BREEDLIST_API = 'https://dog.ceo/api/breeds/list/all';

// eslint-disable-next-line max-lines-per-function
export const AppComponent = (): JSX.Element => {
  const [currentBreedName, setBreedName] = useState('');
  // eslint-disable-next-line immutable/no-let
  let model: mobilenet.MobileNet | null = null;
  // eslint-disable-next-line immutable/no-let
  let breedList: IBreedList = {};
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
    breedList = data.message;
  }

  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBreedList();
  })

  const isADogBreed = (name: string, breedNameList: IBreedList): boolean => {
    const fullName = name.toLowerCase().split(' ');
    const breedName = fullName.pop();
    const foundBreed = Object.keys(breedNameList).find((keyName: string): boolean => keyName === breedName);

    if (foundBreed !== undefined && fullName.length > 0 && breedNameList[foundBreed].length > 0) {
      const subBreed = fullName.pop();
      const foundSubBreed = breedNameList[foundBreed].find((subBreedName: string) => subBreedName === subBreed);

      return foundSubBreed !== undefined;
    }

    return foundBreed !== undefined;
  }

  const isPredictionABreedName = (prediction: IPrediction): boolean => {
    const names = prediction.className.split(', ');

    return names.find((name: string): boolean => isADogBreed(name, breedList)) !== undefined;
  }

  const getBreedNameFromPrediction = (prediction: IPrediction, breedNameList: IBreedList): string | undefined => {
    const names = prediction.className.toLowerCase().split(', ');

    return names.find((name: string): boolean => isADogBreed(name, breedNameList));
  }

  const startPredictions = async (): Promise<void> => {
    if (model !== null && imageElement.current !== null) {
      const predictions = await model.classify(imageElement.current)
      const breedNamePrediction = predictions.find(isPredictionABreedName);

      if (breedNamePrediction !== undefined) {
        const breedName = getBreedNameFromPrediction(breedNamePrediction, breedList);

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
