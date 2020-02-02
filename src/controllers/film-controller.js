import FilmCardComponent from '../components/film-card-component';
import FilmDetailsComponent from '../components/film-details-component';
import {removeElement, renderElement} from '../utils/render';

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(filmAdapterModel) {
    this._filmCardComponent = new FilmCardComponent(filmAdapterModel);
    this._filmDetailsComponent = new FilmDetailsComponent(filmAdapterModel);
    renderElement(this._container, this._filmCardComponent);

    this._filmCardComponent.setCardElementsClickHandler(() => {
      document.body.classList.add(`hide-overflow`);
      renderElement(document.body, this._filmDetailsComponent);

      this._filmDetailsComponent.setCloseBtnClickHandler(() => {
        document.body.classList.remove(`hide-overflow`);
        removeElement(this._filmDetailsComponent);
      });
    });
  }
}
