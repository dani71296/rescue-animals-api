const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },

    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: [true, 'Animal is required']
    },

    status: {
        type: String,
        enum: ['pending', 'under_review', 'approved', 'rejected'],
        default: 'pending'
    },

    notes: {
        type: String
    },

    applicationDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);