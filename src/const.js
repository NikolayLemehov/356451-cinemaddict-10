import {getRandomArrayItem} from "./utils/common";

const URL_FILM_TO_NAME = new Map([
  [`made-for-each-other.png`, `Made for Each Other`],
  [`popeye-meets-sindbad.png`, `Popeye the Sailor Meets Sindbad the Sailor`],
  [`sagebrush-trail.jpg`, `Sagebrush Trail`],
  [`santa-claus-conquers-the-martians.jpg`, `Santa Claus Conquers the Martians`],
  [`the-dance-of-life.jpg`, `The Dance of Life`],
  [`the-great-flamarion.jpg`, `The Great Flamarion`],
  [`the-man-with-the-golden-arm.jpg`, `The Man with the Golden Arm`],
  [`fight-club.jpg`, `Fight Club`],
  [`the-shawshank-redemption.jpg`, `The Shawshank Redemption`],
  [`forrest-gump.jpg`, `Forrest Gump`],
  [`the-matrix.jpg`, `The Matrix`],
  [`the-green-mile.jpg`, `The Green Mile`],
  [`back-to-the-future.jpg`, `Back to the Future`],
  [`django-unchained.jpg`, `Django Unchained`],
  [`wall-e.jpg`, `WALL-E`],
  [`eternal-sunshine-of-the-spotless-mind.jpg`, `Eternal Sunshine of the Spotless Mind`],
  [`snatch.jpg`, `Snatch`],
  [`die-hard.jpg`, `Die Hard`],
  [`lock-stock-and-two-smoking-barrels.jpg`, `Lock, Stock and Two Smoking Barrels`],
  [`catch-me-if-you-can.jpg`, `Catch Me If You Can`],
  [`aladdin.jpg`, `Aladdin`],
  [`kung-fu-panda.jpg`, `Kung Fu Panda`],
  [`meet-joe-black.jpg`, `Meet Joe Black`],
  [`two-weeks-notice.jpg`, `Two Weeks Notice`],
  [`the-blind-side.jpg`, `The Blind Side`],
  [`the-devil-wears-prada.jpg`, `The Devil Wears Prada`],
  [`edge-of-tomorrow.jpg`, `Edge of Tomorrow`],
  [`groundhog-day.jpg`, `Groundhog Day`],
]);
const girlNames = [`Olivia`, `Amelia`, `Jessica`, `Ava`, `Sophia`, `Grace`, `Mia`, `Poppy`, `Ella`, `Lily`, `Ivy`, `Freya`];
const boyNames = [`Harry`, `Charlie`, `George`, `Jack`, `Leo`, `Jacob`, `Freddie`, `Oscar`, `Arthur`, `Logan`, `Joshua`, `Max`];
const lastNames = [`Smith`, `Johnson`, `Williams`, `Brown`, `Davis`, `Miller`, `Moore`, `Taylor`, `Thomas`, `White`, `Martin`];
const createName = () => {
  return Math.random() < 0.5 ? getRandomArrayItem(girlNames) : getRandomArrayItem(boyNames);
};
const createFullName = () => {
  return `${createName()} ${getRandomArrayItem(lastNames)}`;
};

export {URL_FILM_TO_NAME, createFullName};
