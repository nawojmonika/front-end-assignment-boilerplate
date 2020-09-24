import {
  IBreedList,
  IBreedListResponse,
} from './interfaces/IBreedListResponse';
import { IDogGalleryResponse } from './interfaces/IDogGalleryResponse';

const DOG_API = 'https://dog.ceo/api';

export const getAllBreedList = async (): Promise<IBreedList | void> => {
  try {
    const response = await fetch(`${DOG_API}/breeds/list/all`, {
      method: 'GET',
    });
    const data: IBreedListResponse = await response.json();

    return data.message;
  } catch (error) {
    throw new Error('Cannot get all dogs breed list');
  }
};

export const fetchDogsGallery = async (
  breedName: string,
  length: number,
): Promise<string[]> => {
  const [subBreed, breed] = breedName.split(' ');
  const breedParameter = breed === undefined ? '' : `/${breed}`;
  const subBreedParameter = subBreed === undefined ? '' : `/${subBreed}`;

  try {
    const response = await fetch(
      `${DOG_API}/breed${breedParameter}${subBreedParameter}/images/random/${length.toString()}`,
      {
        method: 'GET',
      },
    );
    const data: IDogGalleryResponse = await response.json();

    return data.message;
  } catch (error) {
    throw new Error('Cannot get any pictures for this breed');
  }
};
