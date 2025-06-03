import { Router } from "express";
import {
  crearSolicitudAcceso,
  listarSolicitudAcceso,
  cambiarEstadoSolicitud,
  listarAccesos,
  crearAccesos,
  actualizarAccesos,
  eliminarAccesos
} from "../controllers/accesoController";

const router = Router();


router.post("/crear", crearAccesos);
router.get("/listar", listarAccesos);
router.put("/actualizar/:id", actualizarAccesos);
router.delete('/eliminar/:id', eliminarAccesos);
router.post("/crear-solicitud", crearSolicitudAcceso);
router.get("/listar-solicitud", listarSolicitudAcceso);
router.put("/cambiar-estado/:id", cambiarEstadoSolicitud);

export default router;
