import { IBreedList } from '../../components/app-component/interfaces/IBreedListResponse';
import { IPrediction } from '../../components/app-component/interfaces/IPrediction';

export const BreedPredictionUtils = {
  getBreedNameFromPrediction(
    prediction: IPrediction,
    breedNameList: IBreedList,
  ): string | undefined {
    const names = prediction.className.toLowerCase().split(', ');

    return names.find((name: string): boolean =>
      BreedPredictionUtils.isADogBreed(name, breedNameList),
    );
  },
  isADogBreed(name: string, breedNameList: IBreedList): boolean {
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
  },
  isPredictionABreedName(
    prediction: IPrediction,
    breedNameList: IBreedList,
  ): boolean {
    const names = prediction.className.split(', ');

    return (
      names.find((name: string): boolean =>
        BreedPredictionUtils.isADogBreed(name, breedNameList),
      ) !== undefined
    );
  },
};
