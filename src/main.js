import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createMainNavTemplate} from "./components/main-nav";
import {createShowMoreBtnTemplate} from "./components/show-more-btn";
import {createProfileTemplate} from "./components/profile";
import {createFilmsSectionTemplate} from "./components/films-section";

const CardCount = {
  USUAL: 5,
  RATED: 2,
  COMMENTED: 2,
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
render(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`.main`);
render(mainElement, createMainNavTemplate());
render(mainElement, createFilmsSectionTemplate());

const filmsContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
new Array(CardCount.USUAL)
  .fill(``)
  .forEach(() => render(filmsContainerElement, createFilmCardTemplate()));

const filmsListElement = mainElement.querySelector(`.films-list`);
render(filmsListElement, createShowMoreBtnTemplate());

const ratedFilmsContainerElement = mainElement.querySelector(`.films-list--extra--rated .films-list__container`);
new Array(CardCount.RATED)
  .fill(``)
  .forEach(() => render(ratedFilmsContainerElement, createFilmCardTemplate()));

const commentedContainerListElement = mainElement.querySelector(`.films-list--extra--commented .films-list__container`);
new Array(CardCount.COMMENTED)
  .fill(``)
  .forEach(() => render(commentedContainerListElement, createFilmCardTemplate()));

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
