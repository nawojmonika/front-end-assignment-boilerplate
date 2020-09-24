import React, { useEffect, useReducer, useState } from 'react';

import { ErrorComponent } from '../error-component/error-component';
import { IGaleryComponentProperties } from './interfaces/IGaleryComponentProperties';
import { IImageListStateAction } from './interfaces/IImageListStateAction';
import { ImageListActionType } from './interfaces/ImageListActionType';
import { fetchDogsGallery } from '../../utils/dog-api-utils/dog-api-utils';

const FIRST_FETCH_NUM = 9;
const LOAD_MORE_NUM = 3;
const ERROR_MESSAGE = "Sorry! Couldn't find any dog pictures for this breed!";

const imageListStateReducer = (state: string[], action: IImageListStateAction): string[] => {
  switch (action.type) {
    case ImageListActionType.AddToList: {
      return [...state, ...action.payload];
    }

    case ImageListActionType.Replace: {
      return action.payload
    }

    case ImageListActionType.ClearAll: {
      return [];
    }

    default:
        throw new Error('Unknown action type');

  }
}

export const GalleryComponent = ({breedName}: IGaleryComponentProperties): JSX.Element => {
  const [imageList, imageListDispatch] = useReducer(imageListStateReducer, []);
  const [error, setError] = useState(false);

  useEffect((): void => {
    fetchDogsGallery(breedName, FIRST_FETCH_NUM).then((list: string[]): void => {
      imageListDispatch({payload: list, type: ImageListActionType.Replace})
    }, (): void => {
      setError(true);
    });
    },
  [breedName]);

  useEffect((): () => void   => {
    const onScrollListener = (): void => {
      const scrollPoint = window.innerHeight + window.scrollY;
      const bodyHeight = document.body.offsetHeight;

      if (scrollPoint >= bodyHeight) {
        fetchDogsGallery(breedName, LOAD_MORE_NUM).then((list: string[]): void => {
          imageListDispatch({payload: list, type: ImageListActionType.AddToList});
        }, (): void => {
          setError(true);
        });
      }
    }

    window.addEventListener('scroll', onScrollListener);

    return (): void => {
      window.removeEventListener('scroll', onScrollListener)}
  });

  const handleErrorClose = (): void => {
    setError(false);
  }

  return (
    <div className={'gallery-component'}>
      { error ?
        <ErrorComponent message={ERROR_MESSAGE} onClose={handleErrorClose}/>
        : null
      }
      {imageList.map((url:string, index:number): JSX.Element => {
        return (
        <picture key={index}>
            <source src={url}/>
            <img src={url} alt={breedName}/>
        </picture>
        )
      })}
    </div>
  )
}
