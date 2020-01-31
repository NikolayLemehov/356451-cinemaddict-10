import Api from './api/api';
import FilmCardComponent from './components/film-card';
import {createFilmDetailsTemplate} from "./components/film-details";
import MainNavigationComponent from './components/main-navigation-component';
import {createShowMoreBtnTemplate} from "./components/show-more-btn";
import HeaderProfileComponent from './components/header-profile-component';
import FilmsSectionComponent from './components/films-section-component';
import {renderElement} from './utils/render';
import {mainNav} from "./mock/main-nav";
import {getRankFromWatchedMovie} from "./mock/rank-user";

const AUTHORIZATION = `Basic 6PZAz5uh8iB4RIAL336Xs`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const CardCount = {
  START: 5,
  STEP: 5,
  RATED: 2,
  COMMENTED: 2,
};

const api = new Api(END_POINT, AUTHORIZATION);
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const rank = getRankFromWatchedMovie();
const headerProfileComponent = new HeaderProfileComponent(rank);
renderElement(headerElement, headerProfileComponent);


const mainElement = document.querySelector(`.main`);
const mainNavigationComponent = new MainNavigationComponent(mainNav);
renderElement(mainElement, mainNavigationComponent);
const filmsSectionComponent = new FilmsSectionComponent();
renderElement(mainElement, filmsSectionComponent);


api.getFilms()
  .then((filmAdapterModels) => {
    const films = filmAdapterModels;
    let showedCardCount = CardCount.START;

    const filmsContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
    films.slice(0, showedCardCount).forEach((film) => renderElement(filmsContainerElement, new FilmCardComponent(film)));

    const filmsListElement = mainElement.querySelector(`.films-list`);
    render(filmsListElement, createShowMoreBtnTemplate());

    const ratedFilmsContainerElement = mainElement.querySelector(`.films-list--extra--rated .films-list__container`);
    films.slice(0, CardCount.RATED).forEach((film) => renderElement(ratedFilmsContainerElement, new FilmCardComponent(film)));

    const commentedContainerListElement = mainElement.querySelector(`.films-list--extra--commented .films-list__container`);
    films.slice(0, CardCount.COMMENTED).forEach((film) => renderElement(commentedContainerListElement, new FilmCardComponent(film)));

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
  });
