import AbstractComponent from './abstract-component';

const CHECKED_MENU_CLASS = `sort__button--active`;
const createSortBtnTemplate = ({type, isChecked}) => {
  return (
    `<li><a href="#" class="sort__button ${isChecked ? ` ${CHECKED_MENU_CLASS}` : ``}" 
      data-type="${type}">Sort by ${type}</a></li>`
  );
};
const createFilmCardTemplate = (sorts) => {
  const sortBtnList = sorts.map((it) => createSortBtnTemplate(it)).join(``);

  return (
    `<ul class="sort">
      ${sortBtnList}
    </ul>`
  );
};

export default class SortComponent extends AbstractComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
    this._activeSortType = sorts.find((it) => it.isChecked).type;
  }

  getTemplate() {
    return createFilmCardTemplate(this._sorts);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A` || evt.target.classList.contains(CHECKED_MENU_CLASS)) {
        return;
      }

      this.getElement().querySelectorAll(`.sort__button`).forEach((it) => {
        if (it.dataset.type === this._activeSortType) {
          it.classList.remove(CHECKED_MENU_CLASS);
        }
      });

      evt.target.classList.add(CHECKED_MENU_CLASS);
      const sortType = evt.target.dataset.type;
      this._activeSortType = sortType;

      handler(sortType);
    });
  }
}
