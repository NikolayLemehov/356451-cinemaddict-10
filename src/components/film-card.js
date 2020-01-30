import {formatTime} from "../utils";

const createFilmCardTemplate = (film) => {
  const {name, url, description, year, rate, genre, duration, commentCount} = film;
  const formattedDuration = formatTime(duration);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${url}" alt="The poster of the film '${name}'" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};
