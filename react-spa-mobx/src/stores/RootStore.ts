import { SettingsStore, RouterStore } from "./index";

export default class RootStore {
  public settingsStore: SettingsStore;
  public routerStore: RouterStore;

  constructor(initState?: any) {
    this.settingsStore = new SettingsStore(this);
    this.routerStore = new RouterStore(this);

    console.log(this);
  }
}
