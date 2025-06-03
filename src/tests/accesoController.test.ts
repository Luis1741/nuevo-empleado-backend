import {
  crearAccesos,
  listarAccesos,
  actualizarAccesos,
  eliminarAccesos,
  crearSolicitudAcceso,
  listarSolicitudAcceso,
  cambiarEstadoSolicitud
} from '../controllers/accesoController';
import * as accesoService from '../services/accesoService';

describe('Acceso', () => {
  it('should create an access and respond with status 201', async () => {
    const req: any = { body: { nombre: 'GitHub' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const accesos = { id: 1, nombre: 'GitHub' };
    jest.spyOn(accesoService, 'crearAccesos').mockResolvedValue(accesos as any);

    await crearAccesos(req, res);

    expect(accesoService.crearAccesos).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nombre: 'GitHub' });
  });

  it('should respond 500 if createAccesos fails', async () => {
    const req: any = { body: { nombre: 'GitHub' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(accesoService, 'crearAccesos').mockRejectedValue(new Error('DB caída'));

    await crearAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear accesos', details: expect.any(Error) });
  });

  it('should list accesses', async () => {
    const accesos = [{ id: 1, nombre: 'GitHub' }];
    jest.spyOn(accesoService, 'listarAccesos').mockResolvedValue(accesos as any);

    const req: any = {};
    const res: any = { json: jest.fn() };

    await listarAccesos(req, res);

    expect(accesoService.listarAccesos).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(accesos);
  });

  it('should respond 500 if listarAccesos fails', async () => {
    jest.spyOn(accesoService, 'listarAccesos').mockRejectedValue(new Error('DB caída'));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await listarAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al listar accesos', details: expect.any(Error) });
  });

  it('should update an access and respond with message', async () => {
    const acceso = { id: 1, nombre: 'GitHub' };
    jest.spyOn(accesoService, 'actualizarAcceso').mockResolvedValue(acceso as any);

    const req: any = { params: { id: '1' }, body: { nombre: 'GitHub' } };
    const res: any = { json: jest.fn() };

    await actualizarAccesos(req, res);

    expect(accesoService.actualizarAcceso).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acceso actualizado', acceso });
  });

  it('should respond 404 if access does not exist when updating', async () => {
    jest.spyOn(accesoService, 'actualizarAcceso').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { nombre: 'GitHub' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acceso no encontrado' });
  });

  it('should respond 500 if actualizarAcceso fails', async () => {
    jest.spyOn(accesoService, 'actualizarAcceso').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' }, body: { nombre: 'GitHub' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar el acceso' });
  });

  it('should delete an access and respond with message', async () => {
    const acceso = { id: 1, nombre: 'GitHub' };
    jest.spyOn(accesoService, 'eliminarAccesos').mockResolvedValue(acceso as any);

    const req: any = { params: { id: '1' } };
    const res: any = { json: jest.fn() };

    await eliminarAccesos(req, res);

    expect(accesoService.eliminarAccesos).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acceso eliminado correctamente' });
  });

  it('should respond 404 if access does not exist when deleting', async () => {
    jest.spyOn(accesoService, 'eliminarAccesos').mockResolvedValue(null);

    const req: any = { params: { id: '1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eliminarAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acceso no encontrado' });
  });

  it('should respond 500 if eliminarAccesos fails', async () => {
    jest.spyOn(accesoService, 'eliminarAccesos').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await eliminarAccesos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar el acceso' });
  });

  it('should create access requests and respond with status 201', async () => {
    const solicitudes = [{ id: 1, usuarioId: 2, accesoId: 3, estado: 'pendiente', fechaSolicitud: new Date() }];
    jest.spyOn(accesoService, 'crearSolicitudAcceso').mockResolvedValue(solicitudes as any);

    const req: any = { body: { usuarioId: 2, accesos: [3] } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await crearSolicitudAcceso(req, res);

    expect(accesoService.crearSolicitudAcceso).toHaveBeenCalledWith(2, [3]);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Solicitudes creadas', solicitudes });
  });

  it('should respond 404 if user does not exist when creating request', async () => {
    jest.spyOn(accesoService, 'crearSolicitudAcceso').mockResolvedValue(null);

    const req: any = { body: { usuarioId: 2, accesos: [3] } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await crearSolicitudAcceso(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  it('should respond 500 if crearSolicitudAcceso fails', async () => {
    jest.spyOn(accesoService, 'crearSolicitudAcceso').mockRejectedValue(new Error('DB caída'));

    const req: any = { body: { usuarioId: 2, accesos: [3] } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await crearSolicitudAcceso(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creando solicitudes', details: expect.any(Error) });
  });

  it('should list access requests', async () => {
    const solicitudes = [{ id: 1, usuarioId: 2, accesoId: 3, estado: 'pendiente', fechaSolicitud: new Date() }];
    jest.spyOn(accesoService, 'listarSolicitudAcceso').mockResolvedValue(solicitudes as any);

    const req: any = {};
    const res: any = { json: jest.fn() };

    await listarSolicitudAcceso(req, res);

    expect(accesoService.listarSolicitudAcceso).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(solicitudes);
  });

  it('should respond 500 if listarSolicitudAcceso fails', async () => {
    jest.spyOn(accesoService, 'listarSolicitudAcceso').mockRejectedValue(new Error('DB caída'));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await listarSolicitudAcceso(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al listar solicitudes', details: expect.any(Error) });
  });

  it('should change the state of a request and respond with message', async () => {
    const solicitud = { id: 1, usuarioId: 2, accesoId: 3, estado: 'aprobado', fechaSolicitud: new Date() };
    jest.spyOn(accesoService, 'cambiarEstadoSolicitud').mockResolvedValue(solicitud as any);

    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { json: jest.fn() };

    await cambiarEstadoSolicitud(req, res);

    expect(accesoService.cambiarEstadoSolicitud).toHaveBeenCalledWith(1, 'aprobado');
    expect(res.json).toHaveBeenCalledWith({ message: 'Estado actualizado', solicitud });
  });

  it('should respond 404 if request does not exist when changing state', async () => {
    jest.spyOn(accesoService, 'cambiarEstadoSolicitud').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cambiarEstadoSolicitud(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Solicitud no encontrada' });
  });

  it('should respond 404 if request does not exist when changing state', async () => {
    jest.spyOn(accesoService, 'cambiarEstadoSolicitud').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cambiarEstadoSolicitud(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al cambiar estado', details: expect.any(Error) });
  });
});