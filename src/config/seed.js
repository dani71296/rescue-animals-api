require('dotenv').config();

const mongoose = require('mongoose');
const Animal = require('../models/Animal');
const User = require('../models/User');
const Report = require('../models/Report');

const connectDB = require('./db');

const seedDatabase = async () => {
    try {
        await connectDB();

        // Limpiar datos existentes
        await Animal.deleteMany({});
        await User.deleteMany({});
        await Report.deleteMany({});

        // Crear animales
        const animals = await Animal.insertMany([
            {
                name: 'Max',
                species: 'Dog',
                breed: 'Mixed',
                age: 3,
                gender: 'Male',
                healthStatus: 'Healthy',
                status: 'available',
                rescueDate: new Date('2026-01-15')
            },
            {
                name: 'Luna',
                species: 'Cat',
                breed: 'Siamese',
                age: 2,
                gender: 'Female',
                healthStatus: 'Healthy',
                status: 'available',
                rescueDate: new Date('2026-02-10')
            },
            {
                name: 'Rocky',
                species: 'Dog',
                breed: 'German Shepherd',
                age: 5,
                gender: 'Male',
                healthStatus: 'Under treatment',
                status: 'medical-care',
                rescueDate: new Date('2026-03-05')
            },
            {
                name: 'Bella',
                species: 'Dog',
                breed: 'Labrador',
                age: 4,
                gender: 'Female',
                healthStatus: 'Healthy',
                status: 'adopted',
                rescueDate: new Date('2025-12-20')
            },
            {
                name: 'Milo',
                species: 'Cat',
                breed: 'Domestic Shorthair',
                age: 1,
                gender: 'Male',
                healthStatus: 'Recovering',
                status: 'foster',
                rescueDate: new Date('2026-04-01')
            }
        ]);

        // Crear usuarios
        const users = await User.insertMany([
            {
                name: 'Saul Arana',
                email: 'saul@example.com',
                password: 'password123',
                age: 25,
                gender: 'Male',
                phone: '5555-1111',
                rol: 'admin'
            },
            {
                name: 'Daniel Tudela',
                email: 'daniel@example.com',
                password: 'password123',
                age: 24,
                gender: 'Male',
                phone: '5555-2222',
                rol: 'volunteer'
            },
            {
                name: 'Sergio Bergerat',
                email: 'sergio@example.com',
                password: 'password123',
                age: 26,
                gender: 'Male',
                phone: '5555-3333',
                rol: 'volunteer'
            },
            {
                name: 'Maria Lopez',
                email: 'maria@example.com',
                password: 'password123',
                age: 30,
                gender: 'Female',
                phone: '5555-4444',
                rol: 'user'
            }
        ]);

        // Crear reportes (relacionados a los usuarios ya creados)
        const reports = await Report.insertMany([
            {
                userId: users[3]._id, // Maria Lopez
                location: 'Av. Siempre Viva 742, Cordoba',
                description: 'Perro herido en la via publica, parece atropellado',
                animalType: 'Dog',
                status: 'pending',
                contactPhone: '5555-4444',
                incidentDate: new Date('2026-05-01')
            },
            {
                userId: users[1]._id, // Daniel Tudela
                location: 'Parque Sarmiento, cerca del lago',
                description: 'Gato abandonado en una caja, muy debil',
                animalType: 'Cat',
                status: 'in_progress',
                contactPhone: '5555-2222',
                incidentDate: new Date('2026-06-12')
            },
            {
                userId: users[2]._id, // Sergio Bergerat
                location: 'Ruta 20, km 15',
                description: 'Grupo de cachorros solos cerca de la banquina',
                animalType: 'Dog',
                status: 'resolved',
                contactPhone: '5555-3333',
                incidentDate: new Date('2026-04-20')
            },
            {
                userId: users[3]._id, // Maria Lopez
                location: 'Barrio Alberdi, calle 27',
                description: 'Reporte duplicado, ya fue atendido por otro voluntario',
                animalType: 'Cat',
                status: 'cancelled',
                contactPhone: '5555-4444',
                incidentDate: new Date('2026-07-02')
            }
        ]);

        console.log(`✅ ${animals.length} animals created`);
        console.log(`✅ ${users.length} users created`);
        console.log(`✅ ${reports.length} reports created`);

        console.log('🎉 Database seeded successfully!');

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        console.error('Name:', error.name);
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Full error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedDatabase();