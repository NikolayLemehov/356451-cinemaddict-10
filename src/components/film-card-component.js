import AbstractSmartComponent from './abstract-smart-component';
import {formatTime} from '../utils/common';

const createFilmCardTemplate = (film) => {
  const {filmInfo, userDetails, comments} = film;
  const {title, totalRating, poster, release, runtime, genres, description} = filmInfo;
  const {hasWatchlist, isWatched, isFavorite} = userDetails;
  const formattedRuntime = formatTime(runtime);
  const genreText = genres.join(`, `);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.date.getFullYear()}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${genreText}</span>
      </p>
      <img src="${poster}" alt="The poster of the film '${title}'" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
          ${hasWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
          ${isWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite
          ${isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
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

  setCardElementsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.path.some((it) => it.classList.contains(`film-card__poster`)
        || it.classList.contains(`film-card__title`)
        || it.classList.contains(`film-card__comments`))) {
        return;
      }
      handler(evt);
    });
  }
}
