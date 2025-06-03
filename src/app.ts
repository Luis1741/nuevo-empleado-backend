import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes';
import accesoRoutes from './routes/accesoRoutes';
import computadorRoutes from './routes/computadorRoutes';

dotenv.config();
export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    console.log('Rutas activadas');
    this.app.use('/api/usuarios', usuarioRoutes);
    this.app.use('/api/solicitud-accesos', accesoRoutes);
    this.app.use('/api/asignacion-computadores', computadorRoutes);
  }

  settings() {
    this.app.set('port', process.env.PORT || 3000);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Servidor ejecutándose en el puerto: ${this.app.get('port')}`);
  }
}
