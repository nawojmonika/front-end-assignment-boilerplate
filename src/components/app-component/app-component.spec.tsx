import { isADogBreed } from './app-component';

describe('testing isADogBreed function', (): void => {
  it('should return true in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
    "bulldog": [
        "boston",
        "english",
        "french"
      ],
      "bullterrier": [
        "staffordshire"
      ],
      "cairn": [],
      "cattledog": [
        "australian"
      ],
      "chihuahua": []
      }
    expect(isADogBreed('Boston Bulldog', breedList)).toBe(true);
    expect(isADogBreed('bullterrier', breedList)).toBe(true);
    expect(isADogBreed('ChiHuAhua', breedList)).toBe(true);
  });
  it('should return false in all cases', (): void => {
    expect.assertions(3);
    const breedList = {
    "bulldog": [
        "boston",
        "english",
        "french"
      ],
      "bullterrier": [
        "staffordshire"
      ],
      "cairn": [],
      "cattledog": [
        "australian"
      ],
      "chihuahua": []
      }
    expect(isADogBreed('Monitor', breedList)).toBe(false);
    expect(isADogBreed('Doge', breedList)).toBe(false);
    expect(isADogBreed('French cairn', breedList)).toBe(false);
  });
});


