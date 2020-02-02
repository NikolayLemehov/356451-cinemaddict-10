import MainNavigationComponent from '../components/main-navigation-component';
import {renderElement, replaceElement} from '../utils/render';
import {mainNav} from '../mock/main-nav';

export default class MainNavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._mainNavigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onMenuItemChange = this._onMenuItemChange.bind(this);

    // this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    // const menuItems = this._filmsModel.getMenuItems();
    const menuItems = mainNav;
    const oldComponent = this._mainNavigationComponent;

    this._mainNavigationComponent = new MainNavigationComponent(menuItems);
    this._mainNavigationComponent.setMenuItemChangeHandler(this._onMenuItemChange);
    if (oldComponent) {
      replaceElement(this._mainNavigationComponent, oldComponent);
    } else {
      renderElement(this._container, this._mainNavigationComponent);
    }
  }

  _onMenuItemChange(menuItemName) {
    this._filmsModel.setMenuItemName(menuItemName);
  }

  _onDataChange() {
    this.render();
  }
}
