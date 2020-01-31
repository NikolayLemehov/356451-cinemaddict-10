import AbstractSmartComponent from './abstract-smart-component';
import {formatTime} from '../utils/utils';

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments} = film;
  const {title, totalRating, poster, release, runtime, genre, description} = filmInfo;
  const formattedRuntime = formatTime(runtime);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.date.getFullYear()}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="The poster of the film '${title}'" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCardComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
