import { RootStore } from "./index";
import { action, observable, runInAction } from "mobx";
import basketService from "@services/BasketService";
import { IBall, IBasket } from "@src/models";
import { notification } from "antd";

export default class BasketsStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable initialized = false;
  @observable baskets: IBasket[] = [];
  @observable relatedBalls: IBall[] = [];

  @action sync = async () => {
    const baskets = await basketService.baskets();
    runInAction(() => {
      this.baskets = baskets;
      this.initialized = true;
    });
  };

  @action updateBasket = async (id: string, data: any) => {
    await basketService.updateBasket(id, data);
    await this.sync();
  };
  @action createBasket = async (data: {
    color: string;
    material: string;
    size: string;
  }) => {
    try {
      await basketService.createBasket(data);
      await this.sync();
      notification.success({ message: "Корзина добавлена" });
    } catch (e) {
      notification.error({ message: "Что-то пошло не так" });
    }
  };

  @action deleteBasket = async (id: number) => {
    try {
      await basketService.deleteBasket(id);
      await this.sync();
      notification.success({ message: "Корзина была удалена" });
    } catch (e) {
      notification.error({ message: "Что-то пошло не так" });
    }
  };

  @action getRelatedBalls = async (id: number) => {};
  getBasketById = (id: number) => this.baskets.find((b) => b.id === id);
}
