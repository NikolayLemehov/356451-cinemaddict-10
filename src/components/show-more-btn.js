import AbstractComponent from './abstract-component';

export default class ShowMoreBtn extends AbstractComponent {
  getTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }
}
