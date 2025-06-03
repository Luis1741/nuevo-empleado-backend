import { Request, Response } from "express";
import * as computadorService from "../services/computadorService";

export const crearComputador = async (req: Request, res: Response) => {
  try {
    const nuevoComputador = await computadorService.crearComputador(req.body);
    res.status(201).json(nuevoComputador);
  } catch (error) {
    res.status(500).json({ error: "Error al crear computadora", details: error });
  }
};

export const listarComputadores = async (_req: Request, res: Response) => {
  const computadores = await computadorService.listarComputadores();
  res.json(computadores);
};

export const actualizarComputador = async (req: Request, res: Response) => {
  try {
    const computador = await computadorService.actualizarComputador(Number(req.params.id), req.body);
    if (!computador) {
      res.status(404).json({ error: 'Computador no encontrado' });
    } else {
      res.json({ message: 'Computador actualizado', computador });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el computador' });
  }
};

export const eliminarComputador = async (req: Request, res: Response) => {
  try {
    const computador = await computadorService.eliminarComputador(Number(req.params.id));
    if (!computador) {
      res.status(404).json({ error: 'Computador no encontrado' });
    } else {
      res.json({ message: 'Computador eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el computador' });
  }
};

export const asignarComputador = async (req: Request, res: Response) => {
  const { usuarioId, computadorId } = req.body;
  const asignacion = await computadorService.asignarComputador(usuarioId, computadorId);

  if (!asignacion) {
    res.status(400).json({ error: "Computador no disponible" });
  } else {
    res.status(201).json({ message: "Computador asignado", asignacion });
  }
};

export const historialAsignaciones = async (_req: Request, res: Response) => {
  const asignaciones = await computadorService.historialAsignaciones();
  res.json(asignaciones);
};