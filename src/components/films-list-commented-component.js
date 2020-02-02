import AbstractComponent from './abstract-component';

export default class FilmsListCommentedComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films-list--extra films-list--commented">
        <h2 class="films-list__title">Most commented</h2>
  
        <div class="films-list__container">
  
        </div>
      </section>`
    );
  }
}
