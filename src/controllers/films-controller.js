import {RenderPosition, renderElement, removeElement} from '../utils/render';
import FilmCardComponent from '../components/film-card-component';
import ShowMoreBtnComponent from '../components/show-more-btn-component';
import FilmsListComponent from '../components/films-list-component';
import FilmsListRatedComponent from '../components/films-list-rated-component';
import FilmsListCommentedComponent from '../components/films-list-commented-component';

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

    this._filmsListComponent = null;
    this._filmsListRatedComponent = null;
    this._filmsListCommentedComponent = null;
    this._showMoreBtnComponent = new ShowMoreBtnComponent();

    this._showingFilmsCount = ShowingFilms.PER_PAGE;

    this._onShowMoreBtnClick = this._onShowMoreBtnClick.bind(this);
  }

  render() {
    const filmAdapterModels = this._filmsModel.getFilms();
    renderElement(this._mainElement, this._containerComponent);

    this._filmsListComponent = new FilmsListComponent();
    this._renderFilms(this._filmsListComponent, filmAdapterModels.slice(0, this._showingFilmsCount));

    this._renderShowMoreBtn();

    this._filmsListRatedComponent = new FilmsListRatedComponent();
    this._renderFilms(this._filmsListRatedComponent, filmAdapterModels.slice(0, ShowingFilms.EXTRA));

    this._filmsListCommentedComponent = new FilmsListCommentedComponent();
    this._renderFilms(this._filmsListCommentedComponent, filmAdapterModels.slice(0, ShowingFilms.EXTRA));
  }

  _renderFilms(containerComponent, filmAdapterModels, place = RenderPosition.BEFOREEND) {
    renderElement(this._container, containerComponent, place);
    filmAdapterModels.forEach((film) =>
      renderElement(containerComponent.getElement().querySelector(`.films-list__container`), new FilmCardComponent(film)));
  }

  _renderShowMoreBtn() {
    removeElement(this._showMoreBtnComponent);
    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    renderElement(this._filmsListComponent.getElement(), this._showMoreBtnComponent);
    this._showMoreBtnComponent.setClickHandler(this._onShowMoreBtnClick);
  }

  _onShowMoreBtnClick() {
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount += ShowingFilms.PER_PAGE;
    const showingFilmAdapterModels = this._filmsModel.getFilms().slice(prevFilmsCount, this._showingFilmsCount);

    this._renderFilms(this._filmsListComponent, showingFilmAdapterModels, RenderPosition.AFTERBEGIN);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      removeElement(this._showMoreBtnComponent);
    }
  }
}
