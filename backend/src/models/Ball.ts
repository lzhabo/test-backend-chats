import { DataTypes } from "sequelize";

export interface IBall {
  id: string;
  size: string;
  color: string;
  material: string;
  basketId?: string | null;
}

const ballModel = {
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

export default ballModel;
