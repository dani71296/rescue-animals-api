const Animal = require('../models/Animal');

// GET /animals - Obtener todos los animales
exports.getAllAnimals = async (req, res, next) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        next(error);
    }
};

// GET /animals/:id - Obtener un animal por ID
exports.getAnimalById = async (req, res, next) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        next(error);
    }
};

// POST /animals - Crear un nuevo animal
exports.createAnimal = async (req, res, next) => {
    try {
        const newAnimal = new Animal(req.body);
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error in provided data', errors: error.errors });
        }
        next(error);
    }
};

// PUT /animals/:id - Actualizar un animal
exports.updateAnimal = async (req, res, next) => {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(updatedAnimal);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error on update', errors: error.errors });
        }
        next(error);
    }
};

// DELETE /animals/:id - Eliminar un animal
exports.deleteAnimal = async (req, res, next) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json({ message: 'Animal successfully deleted' });
    } catch (error) {
        next(error);
    }
};