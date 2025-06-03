import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { Usuario } from "./Usuario";
import { Computador } from "./Computador";

export class Asignacion extends Model {
  public id!: number;
  public usuarioId!: number;
  public computadorId!: number;
  public fechaEntrega!: Date;
}

Asignacion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  computadorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Computador,
      key: "id",
    },
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: "AsignacionComputador",
  tableName: "Asignaciones",
  timestamps: false,
});

Usuario.hasMany(Asignacion, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Computador.hasMany(Asignacion, { foreignKey: "computadorId", onDelete: "CASCADE" });
Asignacion.belongsTo(Usuario, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Asignacion.belongsTo(Computador, { foreignKey: "computadorId", onDelete: "CASCADE" });