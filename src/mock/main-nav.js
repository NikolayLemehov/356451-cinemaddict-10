import {getRandomIntegerNumber} from "../utils";

const MovieCount = {
  MIN: 5,
  MAX: 40,
};
const mainNav = [
  {
    url: `all`,
    text: `All movies`,
    isActive: true,
    isCounted: false,
    count: ``,
    isAdditional: false,
  },
  {
    url: `watchlist`,
    text: `Watchlist`,
    isActive: false,
    isCounted: true,
    count: getRandomIntegerNumber(MovieCount.MIN, MovieCount.MAX),
    isAdditional: false,
  },
  {
    url: `history`,
    text: `History`,
    isActive: false,
    isCounted: true,
    count: getRandomIntegerNumber(MovieCount.MIN, MovieCount.MAX),
    isAdditional: false,
  },
  {
    url: `favorites`,
    text: `Favorites`,
    isActive: false,
    isCounted: true,
    count: getRandomIntegerNumber(MovieCount.MIN, MovieCount.MAX),
    isAdditional: false,
  },
  {
    url: `stats`,
    text: `Stats`,
    isActive: false,
    isCounted: false,
    count: ``,
    isAdditional: true,
  },
];

export {mainNav};
