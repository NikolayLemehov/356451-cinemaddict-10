import {URL_FILM_TO_NAME as FILM_MAP} from "../const";
import {getRandomIntegerNumber, getRandomArrayItem} from "../utils/common";

const POSTER_URL_PREFIX = `./images/posters/`;
const GRADE = 10;
const phrases = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];
const genres = [`Action`, `Animation`, `Comedy`, `Crime`, `Drama`, `Fantasy`, `Historical`, `Horror`, `Romance`, `Thriller`];
const PhraseCount = {
  MIN: 1,
  MAX: 3,
};
const Year = {
  MIN: 1950,
  MAX: 2018,
};
const Rate = {
  MIN: 1,
  MAX: 9,
};
const DurationMinute = {
  MIN: 30,
  MAX: 60 * 3,
};
const CommentCount = {
  MIN: 0,
  MAX: 200,
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomNumber = (min, max) => Math.floor(min * GRADE + Math.random() * (max * GRADE + 1 - min * GRADE)) / GRADE;

const generateFilm = (fileName) => {
  return {
    name: FILM_MAP.get(fileName),
    url: `${POSTER_URL_PREFIX}${fileName}`,
    description: shuffle(phrases.slice()).slice(0, getRandomIntegerNumber(PhraseCount.MIN, PhraseCount.MAX)).join(` `),
    year: getRandomIntegerNumber(Year.MIN, Year.MAX),
    rate: getRandomNumber(Rate.MIN, Rate.MAX),
    genre: getRandomArrayItem(genres),
    duration: new Date(0, 0, 0, 0, getRandomIntegerNumber(DurationMinute.MIN, DurationMinute.MAX)),
    commentCount: getRandomIntegerNumber(CommentCount.MIN, CommentCount.MAX),
  };
};

const generateFilms = (count) => {
  const randomFileNames = shuffle([...FILM_MAP.keys()].slice()).slice(0, count);
  return randomFileNames.map((fileName) => generateFilm(fileName));
};

export {generateFilms};
