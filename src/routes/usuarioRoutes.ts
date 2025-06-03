import { Router } from 'express';
import {
  crearUsuario,
  listarUsuarios,
  cambiarEstado,
  eliminarUsuario,
  actualizarUsuario,
  actualizarActivoUsuario
} from '../controllers/usuarioController';

const router = Router();

router.post('/crear', crearUsuario);
router.get('/listar', listarUsuarios);
router.put('/actualizar/:id', actualizarUsuario);
router.delete('/eliminar/:id', eliminarUsuario);
router.put('/cambiar-estado/:id', cambiarEstado);
router.put('/actualizar-activo/:id', actualizarActivoUsuario);

export default router;
