import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario', details: error });
  }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.eliminarUsuario(Number(req.params.id));
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.actualizarUsuario(Number(req.params.id), req.body);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario actualizado', usuario });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

export const actualizarActivoUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.actualizarActivoUsuario(Number(req.params.id), req.body.activo);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Campo activo actualizado', usuario });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar campo activo' });
  }
};

export const cambiarEstado = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.cambiarEstado(Number(req.params.id), req.body.estado);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Estado actualizado', usuario });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};
