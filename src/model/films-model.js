import {SortType, navItems, NavName, FilterType} from '../const';

export default class FilmsModel {
  constructor() {
    this._filmAdapterModels = [];
    this._activeSortType = SortType.DEFAULT;
    this._activeNavItemName = NavName.ALL;
    this._navItemChangeHandlers = [];
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

  getNavItems() {
    return navItems.map((it) => {
      return {
        name: it.name,
        text: it.text,
        isActive: it.name === this._activeNavItemName,
        isCounted: it.isCounted,
        count: it.isCounted ? this.getFilmsByFilter(it.name).length : ``,
        isAdditional: it.isAdditional,
      };
    });
  }

  setNavItemName(navItemName) {
    this._activeNavItemName = navItemName;
    this._callHandlers(this._navItemChangeHandlers);
  }

  setNavItemNameChangeHandler(handler) {
    this._navItemChangeHandlers.push(handler);
  }

  getFilmsByFilter(filterType = this._activeNavItemName) {
    switch (filterType) {
      case FilterType.ALL:
        return this._filmAdapterModels.slice();
      case FilterType.WATCHLIST:
        return this._filmAdapterModels.filter((it) => it.userDetails.hasWatchlist);
      case FilterType.HISTORY:
        return this._filmAdapterModels.filter((it) => it.userDetails.isWatched);
      case FilterType.FAVORITES:
        return this._filmAdapterModels.filter((it) => it.userDetails.isFavorite);
      default:
        return [];
    }
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
