# nuevo-empleado-backend

Para ejecutar la aplicación, sigue estos pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado, versión utilizada node22.

2. Descarga PostgreSql, si estas usando MAC esta es una buena opción [PostgresApp](https://postgresapp.com/).

3. (Opcional) también puedes descargar el gestor de postgre [Postico2](https://eggerapps.at/postico2/).

4. Clona el repositorio del proyecto:
    ```bash
    git clone https://github.com/Luis1741/nuevo-empleado-backend
    ```
5. Navega al directorio del proyecto:
    ```bash
    cd nuevo-empleado-backend
    ```
6. Crea el archivo .env en la raíz del proyecto con las correspondientes variables de entorno:
    * DB_NAME=BASE_DE_DATOS Nota: Si usaste postgreapp este te creara un base de datos por defecto que suele ser el usuario de tu máquina.
    * DB_USER=USUARIO Nota: Si usaste postgreapp este te crea un usuario por defecto que suele ser el usuario de tu máquina.
    * DB_PASS=Pass
    * DB_HOST=localhost
    * DB_PORT=5432
    * DB_SCHEMA=ingresos
    * PORT=3001    

7. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

8. Para ejecutar la aplicación:
    ```bash
    npm start
    ```

9. Se está usando sequelize, al correr la aplicación se creara la base de datos con sus respectivas tablas y datos de pruebas por medio de los seed.

10. En caso de algún inconveniente con la creación ejecuta este comando en tu cliente de base  de datos, probablemente se deba a que no se ha creado el  esquema de base de datos: psql -U TU_USUARO -d TU_BASE_DE_DATOS -h localhost -p 5432 -c "CREATE SCHEMA IF NOT EXISTS ingresos;"  

11. En la raíz encontraras un colección de postman con los cuales podrás probar.

12. Con esto ya tendríamos funcionado el backend.. 🚀

13. Ir al [Frontend](https://github.com/Luis1741/nuevo-empleado-frontend)!... 
