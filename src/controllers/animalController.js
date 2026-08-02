const Animal = require('../models/Animal');

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
    try {
        const newAnimal = new Animal(req.body);
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
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