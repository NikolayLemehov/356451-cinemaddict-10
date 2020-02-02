export default class FilmsModel {
  constructor() {
    this._filmAdapterModels = [];
  }

  setFilms(filmAdapterModels) {
    this._filmAdapterModels = Array.from(filmAdapterModels);
  }

  getFilms() {
    return this._filmAdapterModels.slice();
  }
}
