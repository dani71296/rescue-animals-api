const mongoose = require('mongoose');

// Esquema para la colección de usuarios (cumple con los 8 campos requeridos)
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    phone: { type: String, required: [true, 'Phone is required'] },
    rol: { type: String, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);