import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Acceso extends Model {
    public id!: number;
    public nombre!: string;
}

Acceso.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'AccesoDisponible',
  tableName: 'Accesos',
  timestamps: false,
});
