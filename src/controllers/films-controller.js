import {RenderPosition, renderElement, removeElement} from '../utils/render';
import ShowMoreBtnComponent from '../components/show-more-btn-component';
import FilmsListComponent from '../components/films-list-component';
import FilmsListRatedComponent from '../components/films-list-rated-component';
import FilmsListCommentedComponent from '../components/films-list-commented-component';
import SortComponent from '../components/sort-component';
import FilmController from './film-controller';
import {SortType} from '../const';

const ShowingFilms = {
  PER_PAGE: 5,
  EXTRA: 2,
};

export default class FilmsController {
  constructor(mainElement, containerComponent, filmsModel, api) {
    this._mainElement = mainElement;
    this._containerComponent = containerComponent;
    this._container = containerComponent.getElement();
    this._filmsModel = filmsModel;
    this._api = api;

    this._filmControllers = [];
    this._sortedFilms = [];
    this._filmsListComponent = null;
    this._filmsListRatedComponent = null;
    this._filmsListCommentedComponent = null;
    this._sortBtnComponent = new SortComponent(this._filmsModel.getSorts());
    this._showMoreBtnComponent = new ShowMoreBtnComponent();

    this._showingFilmsCount = ShowingFilms.PER_PAGE;

    this._onShowMoreBtnClick = this._onShowMoreBtnClick.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortBtnComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    renderElement(this._mainElement, this._sortBtnComponent);
    renderElement(this._mainElement, this._containerComponent);

    this._renderFilms();
  }

  _onSortTypeChange(sortType) {
    this._filmsModel.setSortType(sortType);
    this._updateFilms();
  }

  _renderFilms() {
    const filmAdapterModels = this._filmsModel.getFilms();
    this._container.innerHTML = ``;
    switch (this._filmsModel.getSortType()) {
      case SortType.DEFAULT:
        this._sortedFilms = filmAdapterModels.slice();
        break;
      case SortType.DATE:
        this._sortedFilms = filmAdapterModels.slice()
          .sort((a, b) => (b.filmInfo.release.date - a.filmInfo.release.date));
        break;
      case SortType.RATING:
        this._sortedFilms = filmAdapterModels.slice()
          .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
    }
    this._renderSortedFilms();
  }

  _renderSortedFilms() {
    this._filmsListComponent = new FilmsListComponent();
    this._filmControllers = this._filmControllers
      .concat(this._renderSectionFilms(this._filmsListComponent, this._sortedFilms.slice(0, this._showingFilmsCount)));

    this._renderShowMoreBtn();

    this._filmsListRatedComponent = new FilmsListRatedComponent();
    this._filmControllers = this._filmControllers
      .concat(this._renderSectionFilms(this._filmsListRatedComponent, this._sortedFilms.slice(0, ShowingFilms.EXTRA)));

    this._filmsListCommentedComponent = new FilmsListCommentedComponent();
    this._filmControllers = this._filmControllers
      .concat(this._renderSectionFilms(this._filmsListCommentedComponent, this._sortedFilms.slice(0, ShowingFilms.EXTRA)));
  }

  _renderSectionFilms(containerComponent, filmAdapterModels, place = RenderPosition.BEFOREEND) {
    renderElement(this._container, containerComponent, place);
    const container = containerComponent.getElement().querySelector(`.films-list__container`);

    return filmAdapterModels.map((filmAdapterModel) => {
      const filmController = new FilmController(container);
      filmController.render(filmAdapterModel);
      return filmController;
    });
  }

  _removeFilmsControllers() {
    this._filmControllers.forEach((filmController) => filmController.destroy());
    this._filmControllers = [];
    this._container.innerHTML = ``;
  }

  _updateFilms() {
    this._removeFilmsControllers();
    this._renderFilms();
  }

  _renderShowMoreBtn() {
    removeElement(this._showMoreBtnComponent);
    if (this._showingFilmsCount >= this._sortedFilms.length) {
      return;
    }
    renderElement(this._filmsListComponent.getElement(), this._showMoreBtnComponent);
    this._showMoreBtnComponent.setClickHandler(this._onShowMoreBtnClick);
  }

  _onShowMoreBtnClick() {
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount += ShowingFilms.PER_PAGE;
    const showingFilmAdapterModels = this._sortedFilms.slice(prevFilmsCount, this._showingFilmsCount);

    this._filmControllers = this._filmControllers
      .concat(this._renderSectionFilms(this._filmsListComponent, showingFilmAdapterModels, RenderPosition.AFTERBEGIN));

    if (this._showingFilmsCount >= this._sortedFilms.length) {
      removeElement(this._showMoreBtnComponent);
    }
  }
}
