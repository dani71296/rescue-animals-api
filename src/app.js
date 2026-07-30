const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const animalRoutes = require('./routes/animalRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a la Base de Datos
connectDB();

// Middleware para procesar JSON
app.use(express.json());

// Ruta inicial de prueba
app.get('/', (req, res) => {
    res.send('Animal Rescue API is running correctly');
});

// Rutas de las colecciones
app.use('/animals', animalRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});