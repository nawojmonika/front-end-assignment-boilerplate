import { IPrediction } from '../../components/app-component/interfaces/IPrediction';
import {
  getBreedNameFromPrediction,
  isADogBreed,
  isPredictionABreedName,
} from './breed-prediction-utils';

describe('testing isADogBreed function', (): void => {
  it('should return true in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    expect(isADogBreed('Boston Bulldog', breedList)).toBe(true);
    expect(isADogBreed('bullterrier', breedList)).toBe(true);
    expect(isADogBreed('ChiHuAhua', breedList)).toBe(true);
  });
  it('should return false in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    expect(isADogBreed('Monitor', breedList)).toBe(false);
    expect(isADogBreed('Doge', breedList)).toBe(false);
    expect(isADogBreed('French cairn', breedList)).toBe(false);
  });
});

describe('testing isPredictionABreedName function', (): void => {
  it('should return true in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    const prediction1: IPrediction = {
      className: 'yorkshaire rettriver, cairn',
      probability: 0.87653,
    };
    const prediction2: IPrediction = {
      className: 'australian cattledog',
      probability: 0.87653,
    };
    const prediction3: IPrediction = {
      className: 'bulldog',
      probability: 0.87653,
    };
    expect(isPredictionABreedName(prediction1, breedList)).toBe(true);
    expect(isPredictionABreedName(prediction2, breedList)).toBe(true);
    expect(isPredictionABreedName(prediction3, breedList)).toBe(true);
  });
  it('should return false in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    const prediction1: IPrediction = {
      className: 'husky',
      probability: 0.287653,
    };
    const prediction2: IPrediction = {
      className: 'australian chihuahua',
      probability: 0.187653,
    };
    const prediction3: IPrediction = {
      className: 'alpaca',
      probability: 0.087653,
    };
    expect(isPredictionABreedName(prediction1, breedList)).toBe(false);
    expect(isPredictionABreedName(prediction2, breedList)).toBe(false);
    expect(isPredictionABreedName(prediction3, breedList)).toBe(false);
  });
});

describe('testing getBreedNameFromPrediction function', (): void => {
  it('should return cairn', (): void => {
    expect.assertions(1);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    const prediction: IPrediction = {
      className: 'cairn',
      probability: 0.87653,
    };

    expect(getBreedNameFromPrediction(prediction, breedList)).toBe('cairn');
  });
  it('should return staffordshire bullterrier', (): void => {
    expect.assertions(1);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    const prediction: IPrediction = {
      className: 'staffordshire bullterrier',
      probability: 0.87653,
    };

    expect(getBreedNameFromPrediction(prediction, breedList)).toBe(
      'staffordshire bullterrier',
    );
  });
  it('should return french bulldog', (): void => {
    expect.assertions(1);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    const prediction: IPrediction = {
      className: 'french bulldog, bulldog',
      probability: 0.87653,
    };

    expect(getBreedNameFromPrediction(prediction, breedList)).toBe(
      'french bulldog',
    );
  });
});
