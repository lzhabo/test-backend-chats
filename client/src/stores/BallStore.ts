import { RootStore } from "./index";
import { action, observable, runInAction } from "mobx";
import ballService from "@services/BallService";
import { IBall } from "@src/models";
import { randomInteger } from "@src/utils";
import { COLORS, MATERIALS, SIZES } from "@src/types";
import { notification } from "antd";

export default class BallStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable initialized = false;
  @observable balls: IBall[] = [];

  getBallById = (id: number) => this.balls.find((b) => b.id === id);

  @action sync = async () => {
    const balls = await ballService.balls();
    runInAction(() => {
      this.balls = balls;
      this.initialized = true;
    });
  };

  @action updateBall = async (id: string, data: any) => {
    await ballService.updateBall(id, data);
    await this.sync();
  };

  @action createRandomBall = async () => {
    const material = MATERIALS[randomInteger(0, 6)];
    const size = SIZES[randomInteger(0, 6)];
    const color = COLORS[randomInteger(0, 6)];
    try {
      await ballService.createBall({
        material: material,
        size: size,
        color: color,
      });
      notification.success({
        message: "Шар был добавлен",
        description: `Цвет: ${color}, Материал: ${material} , Размер: ${size}`,
      });
      await this.sync();
    } catch (e) {
      notification.error({ message: "Ууупс... ", description: e });
    }
  };

  @action createBall = async (data: {
    color: string;
    material: string;
    size: string;
  }) => {
    try {
      await ballService.createBall(data);
      await this.sync();
      notification.success({ message: "Шар был добавлен" });
    } catch (e) {}
  };
}
