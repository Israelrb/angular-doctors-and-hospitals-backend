require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configuración CORS
app.use(cors());

// Base de datos
dbConnection();

console.log(process.env.PORT);


// Usuario para la conexión de MongoDb Atlas: admin 
// Password: admin

// Rutas
app.get( '/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
} );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});