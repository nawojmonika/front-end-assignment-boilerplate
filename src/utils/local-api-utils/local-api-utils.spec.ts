import fetchMock from 'fetch-mock';

import { uploadPicture } from './local-api-utils';

describe('testing upload picture function', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });
  it('should return an image url', async (): Promise<void> => {
    expect.assertions(1);
    fetchMock.postOnce('http://localhost:3000/upload-image', {
      data: {
        url: 'mockUrl',
      },
    });
    const file = new File(['dummy'], 'dummy.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('image', file);
    const imageUrl = await uploadPicture(formData);
    expect(imageUrl).toBe('mockUrl');
  });

  it('should throw an error', async (): Promise<void> => {
    expect.assertions(1);
    fetchMock.postOnce('http://localhost:3000/upload-image', 500);
    const file = new File(['dummy'], 'dummy.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('image', file);

    await expect(uploadPicture(formData)).rejects.toThrow(
      new Error("Couldn't upload a picture"),
    );
  });
});
