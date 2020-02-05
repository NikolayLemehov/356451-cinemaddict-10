import Api from './api/api';
import FilmsComponent from './components/films-component';
import FooterStatisticsComponent from './components/footer-statistics-component';
import FilmsModel from './model/films-model';
import FilmsController from './controllers/films-controller';
import MainNavigationController from './controllers/main-navigation-controller';
import {renderElement} from './utils/render';

const AUTHORIZATION = `Basic 6PZAz5uh8iB4RIAL336Xs`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsComponent = new FooterStatisticsComponent();
renderElement(footerElement, footerStatisticsComponent);

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const mainNavigationController = new MainNavigationController(mainElement, filmsModel);
mainNavigationController.render();

const filmsComponent = new FilmsComponent();
renderElement(mainElement, filmsComponent);
const filmsController = new FilmsController(mainElement, filmsComponent, filmsModel, api);

const getCommentIdToComment = (comments) => comments.reduce((acc, it) => acc.set(it.id, it), new Map());

api.getFilms()
  .then((filmAdapterModels) => {
    filmsModel.setFilms(filmAdapterModels);
    filmsController.render();
    mainNavigationController.render();
    footerStatisticsComponent.rerender(filmAdapterModels.length);
    return filmAdapterModels;
  })
  .then((filmAdapterModels) => {
    filmAdapterModels.forEach((it) => {
      api.getComments(it.id).then((comments) => {
        const commentIdToComment = getCommentIdToComment(comments);
        it.replenishComments(commentIdToComment);
      });
    });
  });
