import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import { GalleryComponent } from '../gallery-component/gallery-component';
import { UploadComponent } from '../upload-component/upload-component';
import { IBreedList, IBreedListResponse } from './interfaces/IBreedListResponse';
import { IPrediction } from './interfaces/IPrediction';

const BREEDS_API = 'https://dog.ceo/api/breeds/list/all';
const HEIGHT = 300;
const WIDTH = 250;

const isADogBreed = (name: string, breedNameList: IBreedList): boolean => {
  const fullName = name.toLowerCase().split(' ');
  const breedName = fullName.pop();
  const foundBreed = Object.keys(breedNameList).find((keyName: string): boolean => keyName === breedName);

  if (foundBreed !== undefined && fullName.length > 0) {
    if (breedNameList[foundBreed].length > 0) {
      const subBreed = fullName.pop();
      const foundSubBreed = breedNameList[foundBreed].find((subBreedName: string): boolean => subBreedName === subBreed);

      return foundSubBreed !== undefined;
    }

    return false;
  }

  return foundBreed !== undefined;
}

const isPredictionABreedName = (prediction: IPrediction, breedNameList: IBreedList): boolean => {
  const names = prediction.className.split(', ');

  return names.find((name: string): boolean => isADogBreed(name, breedNameList)) !== undefined;
}

const getBreedNameFromPrediction = (prediction: IPrediction, breedNameList: IBreedList): string | undefined => {
  const names = prediction.className.toLowerCase().split(', ');

  return names.find((name: string): boolean => isADogBreed(name, breedNameList));
}

// eslint-disable-next-line max-lines-per-function
export const AppComponent = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageSource] = useState('');
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
    const response = await fetch(`${BREEDS_API}`, {
      method: 'GET'
    });
    const data: IBreedListResponse = await response.json();
    breedList = data.message;
  }

  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBreedList();
  })

  const startPredictions = async (): Promise<void> => {
    if (model !== null && imageElement.current !== null) {
      const predictions = await model.classify(imageElement.current);
      const breedNamePrediction = predictions.find((prediction: IPrediction): boolean => isPredictionABreedName(prediction, breedList));

      if (breedNamePrediction !== undefined) {
        const breedName = getBreedNameFromPrediction(breedNamePrediction, breedList);

        if (breedName !== undefined) {
          setBreedName(breedName);
        }
      }
    }
  }

  return (
    <div className={'app-component'}>
    <h2>Find out your dog breed!</h2>
      {loading ? <CircularProgress /> :
        <picture>
          <source src={imageUrl}/>
          <img  ref={imageElement}
                src={imageUrl}
                hidden={imageUrl.length === 0}
                width={WIDTH}
                height={HEIGHT}
          />
        </picture>
      }
      <h3>{currentBreedName.length > 0 ? `Your dog is a ${currentBreedName.toUpperCase()}` : '' }</h3>
      <UploadComponent setImageSrc={setImageSource} setLoading={setLoading}/>
      <Button onClick={async (): Promise<void> => startPredictions()}
              variant="contained"
              color="primary"
              component="span">
        Find the breed !
      </Button>
      {currentBreedName.length > 0 ?
        <GalleryComponent breedName={currentBreedName} />
      : null}
    </div>
  )
}
