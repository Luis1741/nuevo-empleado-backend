import { Usuario } from '../models/Usuario';
import { Computador } from '../models/Computador';
import { Asignacion } from '../models/AsignacionComputador';

export const crearUsuario = async (data: any) => {
  return Usuario.create(data);
};

export const listarUsuarios = async () => {
  return Usuario.findAll();
};

export const eliminarUsuario = async (id: number) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  await liberarComputadoresDeUsuario(id);
  await usuario.destroy();
  return usuario;
};

export const actualizarUsuario = async (id: number, data: any) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  Object.assign(usuario, data);
  await usuario.save();
  return usuario;
};

export const actualizarActivoUsuario = async (id: number, activo: boolean) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  usuario.activo = activo;
  await liberarComputadoresDeUsuario(id);
  await usuario.save();
  return usuario;
};

export const cambiarEstado = async (id: number, estado: any) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  usuario.estado = estado;
  await usuario.save();
  return usuario;
};

const liberarComputadoresDeUsuario = async (usuarioId: number) => {
  const asignaciones = await Asignacion.findAll({ where: { usuarioId } });
  const computadorIds = asignaciones.map(a => a.computadorId);
  if (computadorIds.length > 0) {
    await Computador.update(
      { disponible: true },
      { where: { id: computadorIds } }
    );
  }
};