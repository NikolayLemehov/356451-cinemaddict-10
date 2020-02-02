import AbstractSmartComponent from './abstract-smart-component';

const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<section class="footer__statistics">
        <p>${filmsCount ? filmsCount : `0`} movies inside</p>
      </section>`
  );
};

export default class FooterStatisticsComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsCount = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }

  rerender(filmsCount) {
    this._filmsCount = filmsCount;
    super.rerender();
  }

  recoveryListeners() {
  }
}
