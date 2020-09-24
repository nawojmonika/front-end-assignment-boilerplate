import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import { BreedPredictionUtils } from '../../utils/breed-prediction-utils';
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


// eslint-disable-next-line max-lines-per-function
export const AppComponent = (): JSX.Element => {
  const [pictureLoading, setPictureLoading] = useState(false);
  const [imageUrl, setImageSource] = useState('');
  const [currentBreedName, setBreedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [breedList, setBreedList] = useState<IBreedList>({});
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const imageElement = useReference<HTMLImageElement>(null);

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
      const breedNamePrediction = predictions.find((prediction: IPrediction): boolean => BreedPredictionUtils.isPredictionABreedName(prediction, breedList));

      if (breedNamePrediction === undefined) {
        setErrorMessage(NO_DOG_FOUND);
      } else {
        const breedName = BreedPredictionUtils.getBreedNameFromPrediction(breedNamePrediction, breedList);

        if (breedName !== undefined) {
          setBreedName(breedName);
        }
      }
    }
  }

  const handleStartPredictions = async (): Promise<void> => {
    await startPredictions();
  }

  const handleCloseError = (): void => {
    setErrorMessage('');
  }

  return (
    <div className={'app-component'}>
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
         <Button onClick={handleStartPredictions}
                 variant="contained"
                 color="primary"
                 component="span"
                 className={'app-component--predict-button'}
                 disabled={imageUrl.length === 0}>
           Find the breed !
         </Button>
         {errorMessage.length > 0 ?
           <ErrorComponent message={errorMessage} onClose={handleCloseError}/>
           : null
         }
         {currentBreedName.length > 0 ?
           <GalleryComponent breedName={currentBreedName} />
           : null}
    </div>
  )
}
