import {
  crearComputador,
  listarComputadores,
  actualizarComputador,
  eliminarComputador,
  asignarComputador,
  historialAsignaciones
} from '../controllers/computadorController';
import * as computadorService from '../services/computadorService';

describe('Computador', () => {
  it('should create a computer and respond with status 201', async () => {
    const req: any = { body: { nombre: 'Dell', numeroSerie: 'DLT-001' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(computadorService, 'crearComputador').mockResolvedValue({ id: 1, ...req.body, disponible: true });

    await crearComputador(req, res);

    expect(computadorService.crearComputador).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body, disponible: true });
  });

  it('should respond 500 if createComputador fails', async () => {
    const req: any = { body: { nombre: 'Dell', numeroSerie: 'DLT-001' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(computadorService, 'crearComputador').mockRejectedValue(new Error('DB caída'));

    await crearComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear computadora', details: expect.any(Error) });
  });

  it('should list computers', async () => {
    const computadores = [{ id: 1, nombre: 'Dell', numeroSerie: 'DLT-001', disponible: true }];
    jest.spyOn(computadorService, 'listarComputadores').mockResolvedValue(computadores as any);

    const req: any = {};
    const res: any = { json: jest.fn() };

    await listarComputadores(req, res);

    expect(computadorService.listarComputadores).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(computadores);
  });

  it('should update a computer and respond with message', async () => {
    const computador = { id: 1, nombre: 'Dell', numeroSerie: 'DLT-001', disponible: true };
    jest.spyOn(computadorService, 'actualizarComputador').mockResolvedValue(computador as any);

    const req: any = { params: { id: '1' }, body: { nombre: 'Dell' } };
    const res: any = { json: jest.fn() };

    await actualizarComputador(req, res);

    expect(computadorService.actualizarComputador).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'Computador actualizado', computador });
  });

  it('should respond 404 if computer does not exist when updating', async () => {
    jest.spyOn(computadorService, 'actualizarComputador').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { nombre: 'Dell' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Computador no encontrado' });
  });

  it('should respond 500 if updateComputador fails', async () => {
    jest.spyOn(computadorService, 'actualizarComputador').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' }, body: { nombre: 'Dell' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar el computador' });
  });

  it('should delete a computer and respond with message', async () => {
    const computador = { id: 1, nombre: 'Dell', numeroSerie: 'DLT-001', disponible: true };
    jest.spyOn(computadorService, 'eliminarComputador').mockResolvedValue(computador as any);

    const req: any = { params: { id: '1' } };
    const res: any = { json: jest.fn() };

    await eliminarComputador(req, res);

    expect(computadorService.eliminarComputador).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Computador eliminado correctamente' });
  });

  it('should respond 404 if computer does not exist when deleting', async () => {
    jest.spyOn(computadorService, 'eliminarComputador').mockResolvedValue(null);

    const req: any = { params: { id: '1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eliminarComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Computador no encontrado' });
  });

  it('should respond 500 if deleteComputador fails', async () => {
    jest.spyOn(computadorService, 'eliminarComputador').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eliminarComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar el computador' });
  });

  it('should assign a computer and respond with message', async () => {
    const asignacion = { id: 1, usuarioId: 2, computadorId: 3, fechaEntrega: new Date() };
    jest.spyOn(computadorService, 'asignarComputador').mockResolvedValue(asignacion as any);

    const req: any = { body: { usuarioId: 2, computadorId: 3 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await asignarComputador(req, res);

    expect(computadorService.asignarComputador).toHaveBeenCalledWith(2, 3);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Computador asignado', asignacion });
  });

  it('should respond 400 if computer is not available when assigning', async () => {
    jest.spyOn(computadorService, 'asignarComputador').mockResolvedValue(null);

    const req: any = { body: { usuarioId: 2, computadorId: 3 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await asignarComputador(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Computador no disponible' });
  });

  it('should list assignment history', async () => {
    const asignaciones = [
      { id: 1, usuarioId: 2, computadorId: 3, fechaEntrega: new Date() }
    ];
    jest.spyOn(computadorService, 'historialAsignaciones').mockResolvedValue(asignaciones as any);

    const req: any = {};
    const res: any = { json: jest.fn() };

    await historialAsignaciones(req, res);

    expect(computadorService.historialAsignaciones).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(asignaciones);
  });
});