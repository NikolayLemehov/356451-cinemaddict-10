import {getRandomIntegerNumber} from "../utils/utils";

const WatchedMovie = {
  MIN: 0,
  MAX: 40,
};
const getRankFromWatchedMovie = () => {
  const countMovie = getRandomIntegerNumber(WatchedMovie.MIN, WatchedMovie.MAX);
  switch (true) {
    case (countMovie >= 1 && countMovie <= 10) :
      return `Novice`;
    case (countMovie >= 11 && countMovie <= 20) :
      return `Fan`;
    case (countMovie >= 21) :
      return `Movie Buff`;
    default :
      return ``;
  }
};

export {getRankFromWatchedMovie};
