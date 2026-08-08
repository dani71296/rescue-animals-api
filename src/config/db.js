const mongoose = require('mongoose');
const dns = require('dns');

// Forzar uso de servidores DNS públicos para resolver SRV de MongoDB Atlas en Windows
dns.setServers(['8.8.8.8', '1.1.1.1']);
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

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