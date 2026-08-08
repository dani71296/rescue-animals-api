const Adoption = require('../models/Adoption');
const mongoose = require('mongoose');

// GET /adoptions - Obtener todas las adopciones
exports.getAllAdoptions = async (req, res, next) => {
    // #swagger.tags = ['Adoptions'];
    // #swagger.description = 'Endpoint to retrieve all Adoptions from the database.';
    try {
        const adoptions = await Adoption.find()
            .populate('userId')
            .populate('animalId');

        res.status(200).json(adoptions);
    } catch (error) {
        next(error);
    }
};

// GET /adoptions/:id - Obtener una adopcion por ID
exports.getAdoptionById = async (req, res, next) => {
    // #swagger.tags = ['Adoptions'];
    // #swagger.description = 'Endpoint to retrieve a adoption by ID.';
    try {
        const adoption = await Adoption.findById(req.params.id)
            .populate('userId')
            .populate('animalId');

        if (!adoption) {
            return res.status(404).json({ message: 'Adoption not found' });
        }
        res.status(200).json(adoption);
    } catch (error) {
        next(error);
    }
};

// POST /adoptions - Crear una nueva adopción
exports.createAdoption = async (req, res, next) => {
    //#swagger.tags = ['Adoptions'];
    //#swagger.description = 'Endpoint to create a new adoption in the database.';
    try {
        const adoption = new Adoption({
            userId: req.body.userId,
            animalId: req.body.animalId,
            status: req.body.status,
            notes: req.body.notes,
            applicationDate: req.body.applicationDate
        });

        const savedAdoption = await adoption.save();

        const populatedAdoption = await Adoption.findById(savedAdoption._id)
            .populate('userId')
            .populate('animalId');

        res.status(201).json(populatedAdoption);
    } catch (error) {
        next(error);
    }
};

// PUT /adoptions/:id - Actualizar una adopción
exports.updateAdoption = async (req, res, next) => {
    //#swagger.tags = ['Adoptions'];
    //#swagger.description = 'Endpoint to update a adoption by ID.';
    try {
        const updateData = {
            userId: req.body.userId,
            animalId: req.body.animalId,
            status: req.body.status,
            notes: req.body.notes,
            applicationDate: req.body.applicationDate
        };

        const updatedAdoption = await Adoption.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        )
            .populate('userId')
            .populate('animalId');

        if (!updatedAdoption) {
            return res.status(404).json({
                message: 'Adoption not found'
            });
        }

        res.status(200).json(updatedAdoption);
    } catch (error) {
        next(error);
    }
};

// DELETE /adoptions/:id - Eliminar una adopción
exports.deleteAdoption = async (req, res, next) => {
    // #swagger.tags = ['Adoptions'];
    // #swagger.description = 'Endpoint to delete a adoption from the database.';     
    try {
        const deletedAdoption = await Adoption.findByIdAndDelete(
            req.params.id
        );

        if (!deletedAdoption) {
            return res.status(404).json({
                message: 'Adoption not found'
            });
        }

        res.status(200).json({
            message: 'Adoption successfully deleted'
        });
    } catch (error) {
        next(error);
    }
};