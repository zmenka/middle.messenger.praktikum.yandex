import { Block } from '../block/block.ts';
import { Route } from './route.ts';
import store from './store.ts';
import { getPathWithParams, getPathWithoutParams } from '../utils/path.ts';

export enum RouterPaths {
  SignIn = '/',
  SignUp = '/sign-up',
  Profile = '/settings',
  Chats = '/messenger/:chatId',
  ChatSettings = '/chat/:chatId',
}

export class Router {
  routes: Route[];
  history: History;
  _currentRoute: Route | null;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
  }

  use(template: RouterPaths, blockCreator: () => Block) {
    const route = new Route(template, blockCreator);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      console.log('onpopstate', event)
      const path = (event.currentTarget as Window)?.location.pathname;
      this._onRoute(path);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(path: string) {
    const route = this.getRoute(path);

    if (!route) {
      console.log('No route for', path, this.routes, route);
      this.go(RouterPaths.SignIn);
      return;
    }

    store.set('currentPath', path)

    if (this._currentRoute?.template === route.template) {
      console.log('the same route', path);
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render();
    this._currentRoute = route;
  }

  go(pathname: RouterPaths, params: Record<string, string | number> = {}) {
    const path = getPathWithParams(pathname, params);
    this.history.pushState({}, "", path);
    this._onRoute(path);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(path: string) {
    return this.routes.find(route => route.match(path));
  }
}

export default new Router();
