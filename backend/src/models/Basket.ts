import { DataTypes } from "sequelize";

export interface IBasket {
  id: string;
  size: string;
  color: string;
  material: string;
}

const basketModel = {
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default basketModel;
