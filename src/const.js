const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};
const NavName = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`,
};
const FilterType = {
  ALL: NavName.ALL,
  WATCHLIST: NavName.WATCHLIST,
  HISTORY: NavName.HISTORY,
  FAVORITES: NavName.FAVORITES,
};

const navItems = [
  {
    name: NavName.ALL,
    text: `All movies`,
    isCounted: false,
    isAdditional: false,
  },
  {
    name: NavName.WATCHLIST,
    text: `Watchlist`,
    isCounted: true,
    isAdditional: false,
  },
  {
    name: NavName.HISTORY,
    text: `History`,
    isCounted: true,
    isAdditional: false,
  },
  {
    name: NavName.FAVORITES,
    text: `Favorites`,
    isCounted: true,
    isAdditional: false,
  },
  {
    name: NavName.STATS,
    text: `Stats`,
    isCounted: false,
    isAdditional: true,
  },
];

export {SortType, NavName, FilterType, navItems};
