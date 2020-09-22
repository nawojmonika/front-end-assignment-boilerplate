import { ImageListActionType } from './ImageListActionType';

export interface IImageListStateAction {
  type: ImageListActionType;
  payload: string[];
}
