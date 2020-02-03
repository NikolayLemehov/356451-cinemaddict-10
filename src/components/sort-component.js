import AbstractSmartComponent from './abstract-smart-component';

const createSortBtnTemplate = ({name, isChecked}) => {
  return (
    `<li><a href="#" class="sort__button sort__button-${name}
      ${isChecked ? ` sort__button--active` : ``}">Sort by ${name}</a></li>`
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

export default class SortComponent extends AbstractSmartComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createFilmCardTemplate(this._sorts);
  }
}
