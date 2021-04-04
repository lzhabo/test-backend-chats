import { RootStore } from "./index";
import { createBrowserHistory, Location } from "history";
import { observable, runInAction } from "mobx";

export enum ROUTES {
  ROOT = "/",
  BALLS = "/balls",
  BASKETS = "/baskets",
  EDIT_BALL = "/balls/edit/:id",
  EDIT_BASKET = "/baskets/edit/:id",
  ADD_BALL = "/balls/add",
  ADD_BASKET = "/baskets/add",
}

export default class RouterStore {
  public rootStore: RootStore;
  public history = createBrowserHistory();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.history.listen((location, action) => {
      this.sync(location);
    });
    this.sync(this.history.location);
  }

  @observable
  currentPath: ROUTES = ROUTES.ROOT;

  @observable
  currentHash = "";

  @observable
  searchParams = new URLSearchParams();

  sync = (location: Location) => {
    runInAction(() => {
      this.currentPath = location.pathname as any;
      this.currentHash = location.hash;
      this.searchParams = new URLSearchParams(location.search);
    });
  };
}
