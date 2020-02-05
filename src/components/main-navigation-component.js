import AbstractSmartComponent from './abstract-smart-component';

const createItemMenuTemplate = ({name, text, isActive, isCounted, count, isAdditional}) => {
  const enumeration = isCounted ? ` <span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `<a href="#${name}" class="main-navigation__item
      ${isActive ? ` main-navigation__item--active` : ``}
      ${isAdditional ? ` main-navigation__item--additional` : ``}"
      data-type="${name}">${text}${enumeration}</a>`
  );
};

const createMainNavTemplate = (navItems) => {
  const menuItemsElement = navItems.map((item) => createItemMenuTemplate(item)).join(``);

  return (
    `<nav class="main-navigation">
      ${menuItemsElement}
    </nav>`
  );
};


export default class MainNavigationComponent extends AbstractSmartComponent {
  constructor(navItems) {
    super();
    this._navItems = navItems;
  }

  getTemplate() {
    return createMainNavTemplate(this._navItems);
  }

  setNavItemChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A` || evt.target.classList.contains(`main-navigation__item--active`)) {
        return;
      }
      if (evt.target.classList.contains(`main-navigation__item--additional`)) {
        // console.log(`diagrams stats`);
      }
      const menuItemName = evt.target.dataset.type;
      handler(menuItemName);
    });
  }
}
