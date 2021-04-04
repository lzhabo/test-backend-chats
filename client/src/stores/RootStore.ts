import { RouterStore } from "./index";
import BasketsStore from "@stores/BasketsStore";
import BallStore from "@stores/BallStore";
import { computed } from "mobx";

export default class RootStore {
  public routerStore: RouterStore;
  public ballStore: BallStore;
  public basketStore: BasketsStore;

  constructor(initState?: any) {
    this.routerStore = new RouterStore(this);
    this.ballStore = new BallStore(this);
    this.basketStore = new BasketsStore(this);
    Promise.all([this.ballStore.sync(), this.basketStore.sync()]).then();
  }
  @computed get initialized() {
    return this.ballStore.initialized && this.basketStore.initialized;
  }
}
