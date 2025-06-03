import { Router } from "express";
import {
  asignarComputador,
  listarComputadores,
  historialAsignaciones,
  crearComputador,
  actualizarComputador,
  eliminarComputador
} from "../controllers/computadorController";

const router = Router();

router.post("/crear", crearComputador);
router.get("/listar", listarComputadores);
router.put("/actualizar/:id", actualizarComputador);
router.delete('/eliminar/:id', eliminarComputador);
router.post("/asignar", asignarComputador);
router.get("/historial", historialAsignaciones);

export default router;
