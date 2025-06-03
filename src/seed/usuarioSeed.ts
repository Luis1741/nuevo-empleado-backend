import { Usuario } from '../models/Usuario';

export const seedUsuarios = async () => {
  const count = await Usuario.count();
  if (count === 0) {
    await Usuario.bulkCreate([
      {
        nombre: 'Carlos Pérez',
        correo: 'carlos.perez@empresa.com',
        area: 'Desarrollo',
        rol: 'Backend',
        estado: 'pendiente',
        activo: true
      },
      {
        nombre: 'Laura Martínez',
        correo: 'laura.martinez@empresa.com',
        area: 'Marketing',
        rol: 'Diseñadora UX',
        estado: 'pendiente',
        activo: true
      },
      {
        nombre: 'Juan López',
        correo: 'juan.lopez@empresa.com',
        area: 'Soporte',
        rol: 'Técnico',
        estado: 'pendiente',
        activo: true
      }
    ]);
    console.log('✅ Usuarios de prueba insertados');
  } else {
    console.log('ℹ️ Usuarios ya existen, seed no ejecutado');
  }
};
