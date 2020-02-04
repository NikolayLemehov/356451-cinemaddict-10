import {SortType} from '../const';

export default class FilmsModel {
  constructor() {
    this._filmAdapterModels = [];
    this._activeSortType = SortType.DEFAULT;
  }

  setFilms(filmAdapterModels) {
    this._filmAdapterModels = Array.from(filmAdapterModels);
  }

  getFilms() {
    return this._filmAdapterModels.slice();
  }

  getSorts() {
    return Object.values(SortType).map((sortType) => {
      return {
        type: sortType,
        isChecked: sortType === this._activeSortType,
      };
    });
  }

  getSortType() {
    return this._activeSortType;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
  }
}
