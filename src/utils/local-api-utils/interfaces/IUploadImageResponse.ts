export interface IUploadImageResponse {
  data: IUploadImageResponseData;
}

interface IUploadImageResponseData {
  url: string;
  name: string;
  mimetype: string;
  size: string;
}
