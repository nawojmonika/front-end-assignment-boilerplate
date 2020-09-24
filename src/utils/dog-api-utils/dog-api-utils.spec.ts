import fetchMock from 'fetch-mock';

import { fetchDogsGallery, getAllBreedList } from './dog-api-utils';

describe('testing getAllBreedList function', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  it('should return a breed name list', async (): Promise<void> => {
    expect.assertions(1);
    const breedList = {
      bulldog: ['boston', 'english', 'french'],
      bullterrier: ['staffordshire'],
      cairn: [],
      cattledog: ['australian'],
      chihuahua: [],
    };
    fetchMock.getOnce('https://dog.ceo/api/breeds/list/all', {
      message: breedList,
    });
    const response = await getAllBreedList();
    expect(response).toStrictEqual(breedList);
  });
  it('should throw an error', async (): Promise<void> => {
    expect.assertions(1);
    fetchMock.getOnce('https://dog.ceo/api/breeds/list/all', 500);

    await expect(getAllBreedList).rejects.toThrow(
      new Error('Cannot get all dogs breed list'),
    );
  });
});

describe('testing fetchDogsGallery function', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  it('should return a dog gallery with 3 elements', async (): Promise<void> => {
    expect.assertions(1);
    const gallery = ['cairn', 'cairn', 'cairn'];

    fetchMock.getOnce('https://dog.ceo/api/breed/cairn/images/random/3', {
      message: gallery,
    });
    const response = await fetchDogsGallery('cairn', 3);
    expect(response).toStrictEqual(gallery);
  });
  it('should throw an error', async (): Promise<void> => {
    expect.assertions(1);
    fetchMock.getOnce('https://dog.ceo/api/breed/cairn/images/random/3', 500);

    await expect(fetchDogsGallery('cairn', 3)).rejects.toThrow(
      new Error('Cannot get any pictures for this breed'),
    );
  });
});
