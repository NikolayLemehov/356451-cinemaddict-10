import {renderElement} from '../utils/render';
import FilmCardComponent from '../components/film-card-component';
import ShowMoreBtn from '../components/show-more-btn';
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

    this._showingFilmsCount = ShowingFilms.PER_PAGE;
  }

  render() {
    const films = this._filmsModel.getFilms();
    renderElement(this._mainElement, this._containerComponent);

    const getContainerElement = (component) => component.getElement().querySelector(`.films-list__container`);

    const filmsListComponent = new FilmsListComponent();
    renderElement(this._container, filmsListComponent);
    films.slice(0, this._showingFilmsCount).forEach((film) =>
      renderElement(getContainerElement(filmsListComponent), new FilmCardComponent(film)));

    renderElement(filmsListComponent.getElement(), new ShowMoreBtn());

    const filmsListRatedComponent = new FilmsListRatedComponent();
    renderElement(this._container, filmsListRatedComponent);
    films.slice(0, ShowingFilms.EXTRA).forEach((film) =>
      renderElement(getContainerElement(filmsListRatedComponent), new FilmCardComponent(film)));

    const filmsListCommentedComponent = new FilmsListCommentedComponent();
    renderElement(this._container, filmsListCommentedComponent);
    films.slice(0, ShowingFilms.EXTRA).forEach((film) =>
      renderElement(getContainerElement(filmsListCommentedComponent), new FilmCardComponent(film)));
  }
}
