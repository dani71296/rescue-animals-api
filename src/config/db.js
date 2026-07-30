const mongoose = require('mongoose');

// Función para conectar a la base de datos leyendo la URI desde las variables de entorno
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log('⚠️ Waiting for MONGODB_URI configuration in .env file...');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection error: ${error.message}`);
    }
};

module.exports = connectDB;