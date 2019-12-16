import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createMainNavTemplate} from "./components/main-nav";
import {createShowMoreBtnTemplate} from "./components/show-more-btn";
import {createProfileTemplate} from "./components/profile";
import {createFilmsSectionTemplate} from "./components/films-section";
import {generateFilms} from "./mock/films";
import {mainNav} from "./mock/main-nav";
import {getRankFromWatchedMovie} from "./mock/rank-user";

const CardCount = {
  LOADED: 24,
  START: 5,
  STEP: 5,
  RATED: 2,
  COMMENTED: 2,
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const rank = getRankFromWatchedMovie();
render(headerElement, createProfileTemplate(rank));

const mainElement = document.querySelector(`.main`);
render(mainElement, createMainNavTemplate(mainNav));
render(mainElement, createFilmsSectionTemplate());

const films = generateFilms(CardCount.LOADED);
let showedCardCount = CardCount.START;

const filmsContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
films.slice(0, showedCardCount).forEach((film) => render(filmsContainerElement, createFilmCardTemplate(film)));

const filmsListElement = mainElement.querySelector(`.films-list`);
render(filmsListElement, createShowMoreBtnTemplate());
const ratedFilmsContainerElement = mainElement.querySelector(`.films-list--extra--rated .films-list__container`);
films.slice(0, CardCount.RATED).forEach((film) => render(ratedFilmsContainerElement, createFilmCardTemplate(film)));
const commentedContainerListElement = mainElement.querySelector(`.films-list--extra--commented .films-list__container`);
films.slice(0, CardCount.COMMENTED).forEach((film) => render(commentedContainerListElement, createFilmCardTemplate(film)));

render(document.body, createFilmDetailsTemplate());
const filmDetailsElement = document.querySelector(`.film-details`);
const filmDetailsCloseBtnElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

const showPopup = () => {
  document.body.classList.add(`hide-overflow`);
  filmDetailsElement.style.display = `block`;
};
showPopup();

const hidePopup = () => {
  filmDetailsElement.style.display = `none`;
  document.body.classList.remove(`hide-overflow`);
};

filmDetailsCloseBtnElement.addEventListener(`click`, () => {
  hidePopup();
});
hidePopup();
