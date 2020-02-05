import MainNavigationComponent from '../components/main-navigation-component';
import {renderElement, replaceElement} from '../utils/render';

export default class MainNavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._mainNavigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onNavItemChange = this._onNavItemChange.bind(this);

    this._filmsModel.setNavItemNameChangeHandler(this._onDataChange);
  }

  render() {
    const menuItems = this._filmsModel.getNavItems();
    const oldComponent = this._mainNavigationComponent;

    this._mainNavigationComponent = new MainNavigationComponent(menuItems);
    this._mainNavigationComponent.setNavItemChangeHandler(this._onNavItemChange);
    if (oldComponent) {
      replaceElement(this._mainNavigationComponent, oldComponent);
    } else {
      renderElement(this._container, this._mainNavigationComponent);
    }
  }

  _onNavItemChange(navItemName) {
    this._filmsModel.setNavItemName(navItemName);
  }

  _onDataChange() {
    this.render();
  }
}
