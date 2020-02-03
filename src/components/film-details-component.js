import moment from 'moment';
import AbstractSmartComponent from './abstract-smart-component';
import {formatTime} from '../utils/common';

const getNormalizeDuration = (date) => {
  const now = new Date();
  const duration = moment.duration(now - date);
  switch (true) {
    case (duration.asMinutes() >= 0 && duration.asMinutes() < 1):
      return `now`;
    case (duration.asMinutes() >= 1 && duration.asMinutes() < 3):
      return `a minute ago`;
    case (duration.asMinutes() >= 3 && duration.asHours() < 1):
      return `a few minutes ago`;
    case (duration.asHours() >= 1 && duration.asHours() < 2):
      return `a hour ago`;
    case (duration.asHours() >= 2 && duration.asDays() < 1):
      return `a few hours ago`;
    case (duration.asDays() >= 1):
      return `a day ago, a two days ago`;
    default:
      return null;
  }
};

const personalRatings = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const createUserRatingInputTemplate = (value, personalRating) => {
  return (
    `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
      value="${value}" id="rating-${value}" ${personalRating === value ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>`
  );
};

const createCommentTemplate = ({author, emotion, comment, date}) => {
  const normalizeDuration = getNormalizeDuration(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${normalizeDuration}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {filmInfo, userDetails, comments, commentIdToComment} = film;
  const {title, originalTitle, totalRating, poster, ageRating, director, writers, actors,
    release, runtime, genres, description} = filmInfo;
  const {personalRating, hasWatchlist, isWatched, isFavorite} = userDetails;
  const releaseDate = moment(release.date).format(`DD MMMM YYYY`);
  const runtimeText = formatTime(runtime);
  const genresList = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
  const personalRatingsList = personalRatings.map((it) => createUserRatingInputTemplate(it, personalRating)).join(``);
  const commentsList = comments.map((id) => createCommentTemplate(commentIdToComment.get(id))).join(``);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">
    
              <p class="film-details__age">${ageRating}+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                  <p class="film-details__user-rating">Your rate ${personalRating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtimeText}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresList}
                  </td>
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist"
              name="watchlist" ${hasWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched"
              name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite"
              name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    
        <div class="form-details__middle-container">
          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <button class="film-details__watched-reset" type="button">Undo</button>
            </div>
    
            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
              </div>
    
              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">The Great Flamarion</h3>
    
                <p class="film-details__user-rating-feelings">How you feel it?</p>
    
                <div class="film-details__user-rating-score">
                  ${personalRatingsList}
                </div>
              </section>
            </div>
          </section>
        </div>
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
    
            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}
