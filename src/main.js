import Api from './api/api';
// import FilmCardComponent from './components/film-card-component';
// import {createFilmDetailsTemplate} from "./components/film-details";
import HeaderProfileComponent from './components/header-profile-component';
import FilmsComponent from './components/films-component';
import FilmsModel from './model/films-model';
import FilmsController from './controllers/films-controller';
import MainNavigationController from './controllers/main-navigation-controller';
import {renderElement} from './utils/render';
import {getRankFromWatchedMovie} from "./mock/rank-user";

const AUTHORIZATION = `Basic 6PZAz5uh8iB4RIAL336Xs`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const mainNavigationController = new MainNavigationController(mainElement, filmsModel);
mainNavigationController.render();

const rank = getRankFromWatchedMovie();
const headerProfileComponent = new HeaderProfileComponent(rank);
renderElement(headerElement, headerProfileComponent);


const filmsComponent = new FilmsComponent();

renderElement(mainElement, filmsComponent);
const filmsController = new FilmsController(mainElement, filmsComponent, filmsModel, api);


api.getFilms()
  .then((filmAdapterModels) => {
    filmsModel.setFilms(filmAdapterModels);
    filmsController.render();
    mainNavigationController.render();

    // const showPopup = () => {
    //   document.body.classList.add(`hide-overflow`);
    //   filmDetailsElement.style.display = `block`;
    // };
    // showPopup();
    //
    // const hidePopup = () => {
    //   filmDetailsElement.style.display = `none`;
    //   document.body.classList.remove(`hide-overflow`);
    // };
    //
    // filmDetailsCloseBtnElement.addEventListener(`click`, () => {
    //   hidePopup();
    // });
    // hidePopup();
  });
