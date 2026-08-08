const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/authenticate.js');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/',isAuthenticated, userController.createUser);
router.put('/:id',isAuthenticated, userController.updateUser);
router.delete('/:id',isAuthenticated, userController.deleteUser);

module.exports = router;