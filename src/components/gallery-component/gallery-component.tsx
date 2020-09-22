import React, { useEffect, useState } from 'react';

import { IGaleryComponentProperties } from './interfaces/IGaleryComponentProperties';
import { IGalleryResponse } from './interfaces/IGalleryResponse';

const GALLERY_API = 'https://dog.ceo/api/breed'
const FIRST_FETCH_NUM = 9;
const LOAD_MORE_NUM = 3;

export const GalleryComponent = ({breedName}: IGaleryComponentProperties): JSX.Element => {
  const [imageList, setImageList] = useState<string[]>([]);

  const fetchDogsGallery = async (length: number): Promise<void> => {
    const [subBreed, breed] = breedName.split(' ');
    const breedParameter = breed === undefined ? '' : `/${breed}`;
    const subBreedParameter = subBreed === undefined ? '' : `/${subBreed}`;
    const response = await fetch(`${GALLERY_API}${breedParameter}${subBreedParameter}/images/random/${length.toString()}`, {
      method: 'GET'
    });
    const data: IGalleryResponse = await response.json();
    const newImageList = [...imageList, ...data.message];
    setImageList(newImageList);
  }

  useEffect((): void => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchDogsGallery(FIRST_FETCH_NUM);
    },
  [breedName]);



  useEffect(()  => {
    const onScrollListener = (): void => {
      const scrollPoint = window.innerHeight + window.scrollY;
      const bodyHeight = document.body.offsetHeight;

      if (scrollPoint >= bodyHeight) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchDogsGallery(LOAD_MORE_NUM)
      }
    }

    window.addEventListener('scroll', onScrollListener);

    return (): void => {
      window.removeEventListener('scroll', onScrollListener)}
  });


  return (
    <div className={'gallery-component'}>
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
