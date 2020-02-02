import {RenderPosition, renderElement, removeElement} from '../utils/render';
import ShowMoreBtnComponent from '../components/show-more-btn-component';
import FilmsListComponent from '../components/films-list-component';
import FilmsListRatedComponent from '../components/films-list-rated-component';
import FilmsListCommentedComponent from '../components/films-list-commented-component';
import FilmController from './film-controller';

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

    this._renderFilms(filmAdapterModels);
  }

  _renderFilms(filmAdapterModels) {
    this._filmsListComponent = new FilmsListComponent();
    this._renderSectionFilms(this._filmsListComponent, filmAdapterModels.slice(0, this._showingFilmsCount));

    this._renderShowMoreBtn();

    this._filmsListRatedComponent = new FilmsListRatedComponent();
    this._renderSectionFilms(this._filmsListRatedComponent, filmAdapterModels.slice(0, ShowingFilms.EXTRA));

    this._filmsListCommentedComponent = new FilmsListCommentedComponent();
    this._renderSectionFilms(this._filmsListCommentedComponent, filmAdapterModels.slice(0, ShowingFilms.EXTRA));
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

    this._renderSectionFilms(this._filmsListComponent, showingFilmAdapterModels, RenderPosition.AFTERBEGIN);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      removeElement(this._showMoreBtnComponent);
    }
  }
}
