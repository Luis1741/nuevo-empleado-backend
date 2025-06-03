import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Usuario } from './Usuario';
import { Acceso } from './Acceso';

export class SolicitudAcceso extends Model {
  public id!: number;
  public usuarioId!: number;
  public accesoId!: number;
  public estado!: string;
  public fechaSolicitud!: Date;
}

SolicitudAcceso.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id'
      }
    },
    accesoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Acceso,
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    },
    fechaSolicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'SolicitudAcceso',
    tableName: 'Solicitudes',
    timestamps: false
  }
);

Usuario.hasMany(SolicitudAcceso, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Acceso.hasMany(SolicitudAcceso, { foreignKey: 'accesoId', onDelete: 'CASCADE' });
SolicitudAcceso.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
SolicitudAcceso.belongsTo(Acceso, { foreignKey: 'accesoId', onDelete: 'CASCADE' });
