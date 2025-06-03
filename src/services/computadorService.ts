import { Computador } from '../models/Computador';
import { Asignacion } from '../models/AsignacionComputador';
import { Usuario } from '../models/Usuario';

export const crearComputador = async (data: any) => {
  return Computador.create(data);
};

export const listarComputadores = async () => {
  return Computador.findAll({ where: { disponible: true } });
};

export const actualizarComputador = async (id: number, data: any) => {
  const computador = await Computador.findByPk(id);
  if (!computador) return null;
  Object.assign(computador, data);
  await computador.save();
  return computador;
};

export const eliminarComputador = async (id: number) => {
  const computador = await Computador.findByPk(id);
  if (!computador) return null;
  await computador.destroy();
  return computador;
};

export const asignarComputador = async (usuarioId: number, computadorId: number) => {
  const computador = await Computador.findByPk(computadorId);
  if (!computador || !computador.disponible) {
    return null;
  }
  const asignacion = await Asignacion.create({ usuarioId, computadorId });
  computador.disponible = false;
  await computador.save();
  return asignacion;
};

export const historialAsignaciones = async () => {
  return Asignacion.findAll({
    include: [Usuario, Computador]
  });
};
