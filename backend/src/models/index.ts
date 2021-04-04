import { Model, ModelCtor, Sequelize } from "sequelize";
import { psqlUrl } from "../config";
import ballModel, { IBall } from "./Ball";
import basketModel, { IBasket } from "./Basket";

class Models {
  private sequelize: Sequelize;
  public ball: ModelCtor<Model<IBall>>;
  public basket: ModelCtor<Model<IBasket>>;

  // public basket: ModelCtor<Model<IBasket, any>>;

  constructor() {
    this.sequelize = new Sequelize(psqlUrl, {
      dialect: "postgres",
    });

    this.basket = this.sequelize.define("basket", basketModel, {
      freezeTableName: true,
    });
    this.ball = this.sequelize.define("ball", ballModel, {
      freezeTableName: true,
    });

    this.basket.hasMany(this.ball, { as: "balls" });
    this.ball.belongsTo(this.basket, { foreignKey: "basketId", as: "basket" });

    this.ball.sync({ alter: true });
    this.basket.sync({ alter: true });
  }
}

export default new Models();
