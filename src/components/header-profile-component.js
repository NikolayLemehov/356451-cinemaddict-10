import AbstractSmartComponent from './abstract-smart-component';

const RankText = {
  NO_RANK: ``,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
};
const RankRange = {
  NOVICE: {
    MIN: 1,
    MAX: 10,
  },
  FAN: {
    MIN: 11,
    MAX: 20,
  },
  MOVIE_BUFF: {
    MIN: 21,
  },
};

const getRank = (watchedCount) => {
  switch (true) {
    case watchedCount >= RankRange.NOVICE.MIN && watchedCount <= RankRange.NOVICE.MAX:
      return RankText.NOVICE;
    case watchedCount >= RankRange.FAN.MIN && watchedCount <= RankRange.FAN.MAX:
      return RankText.FAN;
    case watchedCount >= RankRange.MOVIE_BUFF.MIN:
      return RankText.MOVIE_BUFF;
    default:
      return RankText.NO_RANK;
  }
};
const createHeaderProfileComponent = (films) => {
  const watchedCount = films.map((it) => it.userDetails.isWatched).length;
  const rank = getRank(watchedCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfileComponent extends AbstractSmartComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createHeaderProfileComponent(this._films);
  }

  rerender(films) {
    this._films = films;
    super.rerender();
  }
}
