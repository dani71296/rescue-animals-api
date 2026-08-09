const User = require('../models/User');
const mongoose = require('mongoose');

// GET /users - Obtener todos los usuarios
exports.getAllUsers = async (req, res, next) => {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Endpoint to retrieve all users from the database.';
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// GET /users/:id - Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Endpoint to retrieve a user by ID.';
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// POST /users - Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
    /*
    #swagger.tags = ['Users'];
    #swagger.description = 'Endpoint to create a new user in the database.';
    
    ```
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'New User details',
            required: true,
            schema: {
                $name: 'Carlos Perez',
                $email: 'carlos@example.com',
                $password: 'password123',
                $age: 28,
                $gender: 'Male',
                $phone: '5555-9999',
                rol: 'user'
            }
        }
    */
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        rol: req.body.rol || 'user'
    };
    try {
        const newUser = new User(user);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error in provided data',
                errors: error.errors
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        next(error);
    }
};


// PUT /users/:id - Actualizar un usuario
exports.updateUser = async (req, res, next) => {
    /*
    #swagger.tags = ['Users'];
    #swagger.description = 'Endpoint to update a user by ID.';
    
    ```
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data to update',
            required: true,
            schema: {
                name: 'Carlos Perez',
                email: 'carlos@example.com',
                age: 29,
                gender: 'Male',
                phone: '5555-9999',
                rol: 'user',
                password: 'newpassword123'
            }
        }
    */

    const userId = req.params.id;
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            error: 'Invalid user ID'
        });
    }
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        rol: req.body.rol,
        password: req.body.passwords
    };
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error in provided data',
                errors: error.errors
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        next(error);
    }
};


// DELETE /users/:id - Eliminar un usuario
exports.deleteUser = async (req, res, next) => {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Endpoint to delete a user from the database.';   
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        next(error);
    }
};