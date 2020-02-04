import FilmCardComponent from '../components/film-card-component';
import FilmDetailsComponent from '../components/film-details-component';
import {removeElement, renderElement} from '../utils/render';

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._filmAdapterModel = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDownFilmDetail = this._onEscKeyDownFilmDetail.bind(this);
    this._renderFilmDetail = this._renderFilmDetail.bind(this);
    this._destroyFilmDetail = this._destroyFilmDetail.bind(this);
  }

  render(filmAdapterModel) {
    this._filmAdapterModel = filmAdapterModel;
    this._filmCardComponent = new FilmCardComponent(filmAdapterModel);
    this._filmDetailsComponent = new FilmDetailsComponent(filmAdapterModel);
    renderElement(this._container, this._filmCardComponent);

    this._filmCardComponent.setCardElementsClickHandler(this._renderFilmDetail);
  }

  destroy() {
    removeElement(this._filmCardComponent);
  }

  _renderFilmDetail() {
    document.body.classList.add(`hide-overflow`);
    renderElement(document.body, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDownFilmDetail);

    this._filmDetailsComponent.setCloseBtnClickHandler(this._destroyFilmDetail);
  }

  _destroyFilmDetail() {
    document.removeEventListener(`keydown`, this._onEscKeyDownFilmDetail);
    document.body.classList.remove(`hide-overflow`);
    removeElement(this._filmDetailsComponent);
  }

  _onEscKeyDownFilmDetail(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._destroyFilmDetail();
    }
  }
}
