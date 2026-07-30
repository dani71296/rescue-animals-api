const mongoose = require('mongoose');

// Esquema para la colección de animales (cumple con los 8 campos requeridos)
const animalSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    species: { type: String, required: [true, 'Species is required'] },
    breed: { type: String, required: [true, 'Breed is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    healthStatus: { type: String, required: [true, 'Health status is required'] },
    status: { type: String, default: 'available' },
    rescueDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);