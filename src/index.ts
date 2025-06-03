import { App } from './app';
import sequelize from './config/db';
import { seedAccesos } from './seed/accesoSeed';
import { seedComputadores } from './seed/computadorSeed';
import { seedUsuarios } from './seed/usuarioSeed';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos');
    await sequelize.sync({ alter: true });
    console.log('🗃️ Tablas sincronizadas');
    await seedUsuarios();
    console.log('🌱 Usuarios de prueba sembrados');
    await seedAccesos();
    console.log('🌱 Datos de acceso sembrados');
    await seedComputadores();
    console.log('🌱 Datos de Computadores sembrados');
    const app = new App();
    await app.listen();
  } catch (error) {
    console.error('❌ Error al iniciar la app:', error);
  }
}

main();
