export interface IBreedListResponse {
  message: IBreedListMessageChild;
}

export interface IBreedListMessageChild {
  [key: string]: Array<string>;
}
