const User = require('../models/User');

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
        const user = await User.findById(req.params.id);
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
    /*  #swagger.tags = ['Users']
        #swagger.description = 'Endpoint to create a new user in the database.'
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
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

// PUT /users/:id - Actualizar un usuario
exports.updateUser = async (req, res, next) => {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Endpoint to update a user in the database.';
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// DELETE /users/:id - Eliminar un usuario
exports.deleteUser = async (req, res, next) => {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Endpoint to delete a user from the database.';   
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        next(error);
    }
};