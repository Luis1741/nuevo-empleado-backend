import { Request, Response } from 'express';
import * as accesoService from '../services/accesoService';

export const crearAccesos = async (req: Request, res: Response) => {
  try {
    const nuevoAcceso = await accesoService.crearAccesos(req.body);
    res.status(201).json(nuevoAcceso);
  } catch (error) {
    res.status(500).json({ error: "Error al crear accesos", details: error });
  }
};

export const listarAccesos = async (_req: Request, res: Response) => {
  try {
    const accesos = await accesoService.listarAccesos();
    res.json(accesos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar accesos", details: error });
  }
};

export const actualizarAccesos = async (req: Request, res: Response) => {
  try {
    const acceso = await accesoService.actualizarAcceso(Number(req.params.id), req.body);
    if (!acceso) {
      res.status(404).json({ error: 'Acceso no encontrado' });
    } else {
      res.json({ message: 'Acceso actualizado', acceso });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el acceso' });
  }
};

export const eliminarAccesos = async (req: Request, res: Response) => {
  try {
    const acceso = await accesoService.eliminarAccesos(Number(req.params.id));
    if (!acceso) {
      res.status(404).json({ error: 'Acceso no encontrado' });
    } else {
      res.json({ message: 'Acceso eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el acceso' });
  }
};

export const listarSolicitudAcceso = async (_req: Request, res: Response) => {
  try {
    const solicitudes = await accesoService.listarSolicitudAcceso();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: "Error al listar solicitudes", details: error });
  }
};

export const crearSolicitudAcceso = async (req: Request, res: Response) => {
  const { usuarioId, accesos } = req.body;
  try {
    const solicitudes = await accesoService.crearSolicitudAcceso(usuarioId, accesos);
    if (!solicitudes) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(201).json({ message: "Solicitudes creadas", solicitudes });
  } catch (error) {
    res.status(500).json({ error: "Error creando solicitudes", details: error });
  }
};

export const cambiarEstadoSolicitud = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const solicitud = await accesoService.cambiarEstadoSolicitud(Number(id), estado);
    if (!solicitud) {
      res.status(404).json({ error: "Solicitud no encontrada" });
    }
    res.json({ message: "Estado actualizado", solicitud });
  } catch (error) {
    res.status(500).json({ error: "Error al cambiar estado", details: error });
  }
};
