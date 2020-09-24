import { IPrediction } from '../../components/app-component/interfaces/IPrediction';
import { IBreedList } from '../dog-api-utils/interfaces/IBreedListResponse';

export const isADogBreed = (
  name: string,
  breedNameList: IBreedList,
): boolean => {
  const fullName = name.toLowerCase().split(' ');
  const breedName = fullName.pop();
  const foundBreed = Object.keys(breedNameList).find(
    (keyName: string): boolean => keyName === breedName,
  );

  if (foundBreed !== undefined && fullName.length > 0) {
    if (breedNameList[foundBreed].length > 0) {
      const subBreed = fullName.pop();
      const foundSubBreed = breedNameList[foundBreed].find(
        (subBreedName: string): boolean => subBreedName === subBreed,
      );

      return foundSubBreed !== undefined;
    }

    return false;
  }

  return foundBreed !== undefined;
};

export const getBreedNameFromPrediction = (
  prediction: IPrediction,
  breedNameList: IBreedList,
): string | undefined => {
  const names = prediction.className.toLowerCase().split(', ');

  return names.find((name: string): boolean =>
    isADogBreed(name, breedNameList),
  );
};

export const isPredictionABreedName = (
  prediction: IPrediction,
  breedNameList: IBreedList,
): boolean => {
  const names = prediction.className.split(', ');

  return (
    names.find((name: string): boolean => isADogBreed(name, breedNameList)) !==
    undefined
  );
};
