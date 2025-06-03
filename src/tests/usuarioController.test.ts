import { 
    crearUsuario,
    listarUsuarios,
    actualizarUsuario,
    cambiarEstado,
    actualizarActivoUsuario
} from '../controllers/usuarioController';    
import * as usuarioService from '../services/usuarioService';

describe('Usuario', () => {

  it('should create a user and respond with status 201', async () => {
    const req: any = { body: { nombre: 'Usuario', correo: 'usuario@correo.com' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.spyOn(usuarioService, 'crearUsuario').mockResolvedValue({ id: 1, ...req.body });
    await crearUsuario(req, res);
    expect(usuarioService.crearUsuario).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });

  it('should respond 500 if the service fails (create)', async () => {
    const req: any = { body: { nombre: 'Usuario', correo: 'usuario@correo.com' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(usuarioService, 'crearUsuario').mockRejectedValue(new Error('DB caída'));
    await crearUsuario(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error al crear usuario',
      details: expect.any(Error)
    });
  });

  it('should respond with the list of users', async () => {
      const usuarios = [{
        id: 6,
        nombre: "Luis Enrique",
        correo: "luis.orobio@empresa.com",
        area: "Desarrollo",
        rol: "Fullstack",
        estado: "aprobado",
        activo: false
}];
    jest.spyOn(usuarioService, 'listarUsuarios').mockResolvedValue(usuarios as any[]);

    const req: any = {};
    const res: any = { json: jest.fn() };

    await listarUsuarios(req, res);

    expect(usuarioService.listarUsuarios).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });

  it('should respond 500 if the service fails (list)', async () => {
    jest.spyOn(usuarioService, 'listarUsuarios').mockRejectedValue(new Error('DB caída'));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await listarUsuarios(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener usuarios' });
  });

    it('should update a user and respond with message', async () => {
    const usuario = { id: 1, nombre: 'Actualizado' };
    jest.spyOn(usuarioService, 'actualizarUsuario').mockResolvedValue(usuario as any);

    const req: any = { params: { id: '1' }, body: { nombre: 'Actualizado' } };
    const res: any = { json: jest.fn() };

    await actualizarUsuario(req, res);

    expect(usuarioService.actualizarUsuario).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario actualizado', usuario });
  });

  it('should respond 404 if the user does not exist (update)', async () => {
    jest.spyOn(usuarioService, 'actualizarUsuario').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { nombre: 'Actualizado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  it('should respond 500 if the service fails (update)', async () => {
    jest.spyOn(usuarioService, 'actualizarUsuario').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' }, body: { nombre: 'Actualizado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar usuario' });
  });

  it('should update the active field and respond with message', async () => {
    const usuario = { id: 1, activo: false };
    jest.spyOn(usuarioService, 'actualizarActivoUsuario').mockResolvedValue(usuario as any);

    const req: any = { params: { id: '1' }, body: { activo: false } };
    const res: any = { json: jest.fn() };

    await actualizarActivoUsuario(req, res);

    expect(usuarioService.actualizarActivoUsuario).toHaveBeenCalledWith(1, false);
    expect(res.json).toHaveBeenCalledWith({ message: 'Campo activo actualizado', usuario });
  });

  it('should respond 404 if the user does not exist (update active)', async () => {
    jest.spyOn(usuarioService, 'actualizarActivoUsuario').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { activo: false } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarActivoUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  it('should respond 500 if the service fails (update active)', async () => {
    jest.spyOn(usuarioService, 'actualizarActivoUsuario').mockRejectedValue(new Error('DB caída'));

    const req: any = { params: { id: '1' }, body: { activo: false } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await actualizarActivoUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar campo activo' });
  });

  it('should change the state and respond with message', async () => {
    const usuario = { id: 1, estado: 'aprobado' };
    jest.spyOn(usuarioService, 'cambiarEstado').mockResolvedValue(usuario as any);

    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { json: jest.fn() };

    await cambiarEstado(req, res);

    expect(usuarioService.cambiarEstado).toHaveBeenCalledWith(1, 'aprobado');
    expect(res.json).toHaveBeenCalledWith({ message: 'Estado actualizado', usuario });
  });

  it('should respond 404 if the user does not exist (change state)', async () => {
    jest.spyOn(usuarioService, 'cambiarEstado').mockResolvedValue(null);

    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cambiarEstado(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  it('should respond 500 if the service fails (change state)', async () => {
    jest.spyOn(usuarioService, 'cambiarEstado').mockRejectedValue(new Error('DB caída'));
    const req: any = { params: { id: '1' }, body: { estado: 'aprobado' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cambiarEstado(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar estado' });
  });

});
