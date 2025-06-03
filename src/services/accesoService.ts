import { SolicitudAcceso } from '../models/SolicitudAcceso';
import { Acceso } from '../models/Acceso';
import { Usuario } from '../models/Usuario';

export const crearAccesos = async (data: any) => {
  return Acceso.create(data);
};

export const listarAccesos = async () => {
  return Acceso.findAll();
};

export const actualizarAcceso = async (id: number, data: any) => {
  const acceso = await Acceso.findByPk(id);
  if (!acceso) return null;
  Object.assign(acceso, data);
  await acceso.save();
  return acceso;
};

export const eliminarAccesos = async (id: number) => {
  const acceso = await Acceso.findByPk(id);
  if (!acceso) return null;
  await acceso.destroy();
  return acceso;
};

export const crearSolicitudAcceso = async (usuarioId: number, accesos: number[]) => {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) return null;
  const solicitudes = await Promise.all(
    accesos.map(async (accesoId: number) => {
      return await SolicitudAcceso.create({
        usuarioId,
        accesoId,
        estado: 'pendiente'
      });
    })
  );
  return solicitudes;
};

export const listarSolicitudAcceso = async () => {
  return SolicitudAcceso.findAll({
    include: [Usuario, Acceso]
  });
};

export const cambiarEstadoSolicitud = async (id: number, estado: string) => {
  const solicitud = await SolicitudAcceso.findByPk(id);
  if (!solicitud) return null;
  solicitud.estado = estado;
  await solicitud.save();
  return solicitud;
};
