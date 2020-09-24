import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import { ErrorComponent } from '../error-component/error-component';
import { GalleryComponent } from '../gallery-component/gallery-component';
import { UploadComponent } from '../upload-component/upload-component';
import { IBreedList, IBreedListResponse } from './interfaces/IBreedListResponse';
import { IPrediction } from './interfaces/IPrediction';

const BREEDS_API = 'https://dog.ceo/api/breeds/list/all';
const NO_DOG_FOUND = "Sorry! Couldn't find a dog in the picture";
const GENERIC_ERROR = 'Sorry! Something went wrong. Please try again later';
const HEIGHT = 300;
const WIDTH = 250;

export const isADogBreed = (name: string, breedNameList: IBreedList): boolean => {
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

export const isPredictionABreedName = (prediction: IPrediction, breedNameList: IBreedList): boolean => {
  const names = prediction.className.split(', ');

  return names.find((name: string): boolean => isADogBreed(name, breedNameList)) !== undefined;
}

export const getBreedNameFromPrediction = (prediction: IPrediction, breedNameList: IBreedList): string | undefined => {
  const names = prediction.className.toLowerCase().split(', ');

  return names.find((name: string): boolean => isADogBreed(name, breedNameList));
}

// eslint-disable-next-line max-lines-per-function
export const AppComponent = (): JSX.Element => {
  const [appLoading, setAppLoading] = useState(true);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [imageUrl, setImageSource] = useState('');
  const [currentBreedName, setBreedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [breedList, setBreedList] = useState<IBreedList>({});
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const imageElement = useReference<HTMLImageElement>(null);

  useEffect((): void => {
    if (model !== null && Object.keys(breedList).length > 0) {
      setAppLoading(false);
    }
  }, [model, breedList]);

  useEffect((): void => {
    if (model === null) {
      const loadModel = async (): Promise<mobilenet.MobileNet> => {
        const loadedModel = await mobilenet.load();

        return loadedModel;
      };

      loadModel().then((loadedModel: mobilenet.MobileNet): void => {
        setModel(loadedModel);
      }, (): void => {
        setErrorMessage(GENERIC_ERROR);
      });
    }
  }, []);

  useEffect((): void => {
    if (Object.keys(breedList).length === 0) {
      const loadBreedList = async (): Promise<IBreedList | void> => {
        try {
          const response = await fetch(`${BREEDS_API}`, {
            method: 'GET'
          });
          const data: IBreedListResponse = await response.json();

          return data.message;
        } catch (error) {
          throw new Error(GENERIC_ERROR);
        }
      }

      loadBreedList().then((response: IBreedList | void):void => {
        if (response !== undefined) {
          setBreedList(response);
        }
      }, (): void => {
        setErrorMessage(GENERIC_ERROR);
      });
    }

  }, []);

  const startPredictions = async (): Promise<void> => {
    if (model !== null && imageElement.current !== null) {
      const predictions = await model.classify(imageElement.current);
      const breedNamePrediction = predictions.find((prediction: IPrediction): boolean => isPredictionABreedName(prediction, breedList));

      if (breedNamePrediction === undefined) {
        setErrorMessage(NO_DOG_FOUND);
      } else {
        const breedName = getBreedNameFromPrediction(breedNamePrediction, breedList);

        if (breedName !== undefined) {
          setBreedName(breedName);
        }
      }
    }
  }

  return (
    <div className={'app-component'}>
      {appLoading ? <CircularProgress/> :
       <>
         <h2>Find out your dog breed!</h2>
         {pictureLoading ? <CircularProgress /> :
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
         <h3>{currentBreedName.length > 0 ? `The breed is: ${currentBreedName.toUpperCase()}` : ''}</h3>
         <UploadComponent setImageSrc={setImageSource} setLoading={setPictureLoading}/>
         <Button onClick={async (): Promise<void> => startPredictions()}
                 variant="contained"
                 color="primary"
                 component="span"
                 disabled={imageUrl.length === 0}>
           Find the breed !
         </Button>
         {errorMessage.length > 0 ?
           <ErrorComponent message={errorMessage} onClose={(): void => setErrorMessage('')}/>
           : null
         }
         {currentBreedName.length > 0 ?
           <GalleryComponent breedName={currentBreedName} />
           : null}
       </>
      }
    </div>
  )
}
