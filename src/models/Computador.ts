import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Computador extends Model {
  public id!: number;
  public nombre!: string;
  public numeroSerie!: string;
  public disponible!: boolean;
}

Computador.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroSerie: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: "Computador",
  tableName: "Computadores",
  timestamps: false,
});