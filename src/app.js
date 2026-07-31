const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const routes = require('./routes/index');


const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a la Base de Datos
connectDB();

// Middleware para procesar JSON
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })
app.use('/', routes)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});