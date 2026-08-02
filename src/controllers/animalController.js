const Animal = require('../models/Animal');
const mongoose = require('mongoose');

// GET /animals - Obtener todos los animales
exports.getAllAnimals = async (req, res, next) => {
    // #swagger.tags = ['Animals'];
    // #swagger.description = 'Endpoint to retrieve all animals from the database.';
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        next(error);
    }
};

// GET /animals/:id - Obtener un animal por ID
exports.getAnimalById = async (req, res, next) => {
    // #swagger.tags = ['Animals'];
    // #swagger.description = 'Endpoint to retrieve an animal by ID.';
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
    /*  #swagger.tags = ['Animals']
        #swagger.description = 'Endpoint to create a new animal in the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'New Animal details',
            required: true,
            schema: {
                $name: 'Firulais',
                $species: 'Dog',
                $breed: 'Beagle',
                $age: 2,
                $gender: 'Male',
                $healthStatus: 'Healthy',
                status: 'available'
            }
        }
    */
   const animal = {  
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        healthStatus: req.body.healthStatus,
        status: req.body.status || 'available',
        rescueDate: req.body.rescueDate || Date.now()
   }
    try {
        const newAnimal = new Animal(animal);
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
        console.error('Error creating animal:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error in provided data',
                errors: error.errors
            });
        }
        next(error);
    }
};

// PUT /animals/:id - Actualizar un animal
exports.updateAnimal = async (req, res, next) => {
    /*  #swagger.tags = ['Animals']
        #swagger.description = 'Endpoint to update an animal in the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Animal data to update',
            required: true,
            schema: {
                name: 'Firulais',
                species: 'Dog',
                breed: 'Beagle',
                age: 3,
                gender: 'Male',
                healthStatus: 'Healthy',
                status: 'adopted'
            }
        }
    */
   const animalid = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(animalid)) {
        return res.status(400).json({ message: 'Invalid animal ID' });
    }
    const updateDataAnimal = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        healthStatus: req.body.healthStatus,
        status: req.body.status || 'available',
        rescueDate: req.body.rescueDate || Date.now()
    };
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(
            animalid,
            { $set: updateDataAnimal },
            { new: true, runValidators: true }
        );
        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(updatedAnimal);
    } catch (error) {
        next(error);
    }
};

// DELETE /animals/:id - Eliminar un animal
exports.deleteAnimal = async (req, res, next) => {
    // #swagger.tags = ['Animals'];
    // #swagger.description = 'Endpoint to delete an animal from the database.';
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