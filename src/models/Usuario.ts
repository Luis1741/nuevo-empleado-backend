import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public correo!: string;
  public area!: string;
  public rol!: string;
  public estado!: 'pendiente' | 'aprobado' | 'rechazado';
  public activo!: boolean;
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    defaultValue: 'pendiente',
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuarios',
  schema: process.env.DB_SCHEMA,
  timestamps: false
});
