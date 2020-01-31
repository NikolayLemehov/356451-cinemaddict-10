import AbstractSmartComponent from './abstract-smart-component';

const createItemMenuTemplate = (itemMenu) => {
  const {url, text, isActive, isCounted, count, isAdditional} = itemMenu;
  const activity = isActive ? `main-navigation__item--active` : ``;
  const enumeration = isCounted ? ` <span class="main-navigation__item-count">${count}</span>` : ``;
  const addition = isAdditional ? `main-navigation__item--additional` : ``;

  return (
    `<a href="#${url}" class="main-navigation__item ${activity} ${addition}">${text}${enumeration}</a>`
  );
};

const createMainNavTemplate = (mainNav) => {
  const menuItemsElement = mainNav.map((item) => createItemMenuTemplate(item)).join(``);

  return (
    `<nav class="main-navigation">
      ${menuItemsElement}
    </nav>`
  );
};


export default class MainNavigationComponent extends AbstractSmartComponent {
  constructor(mainNav) {
    super();
    this._mainNav = mainNav;
  }

  getTemplate() {
    return createMainNavTemplate(this._mainNav);
  }
}
