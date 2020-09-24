import { IUploadImageResponse } from './interfaces/IUploadImageResponse';

const API_URL = 'http://localhost:3000';

export const uploadPicture = async (formData: FormData): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/upload-image`, {
      body: formData,
      method: 'POST',
    });
    const data: IUploadImageResponse = await response.json();

    return data.data.url;
  } catch (error) {
    throw new Error("Couldn't upload a picture");
  }
};
