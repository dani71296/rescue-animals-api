const mongoose = require('mongoose');

// Esquema para la colección de reportes (relacionada con users)
const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    animalType: { type: String, required: [true, 'Animal type is required'] },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'cancelled'],
        default: 'pending'
    },
    contactPhone: { type: String, required: [true, 'Contact phone is required'] },
    incidentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
