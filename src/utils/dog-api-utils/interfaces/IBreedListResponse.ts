export interface IBreedListResponse {
  message: IBreedList;
}

export interface IBreedList {
  [key: string]: Array<string>;
}
