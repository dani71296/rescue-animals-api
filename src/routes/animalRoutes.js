const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const isAuthenticated = require('../middleware/authenticate.js');

router.get('/',  animalController.getAllAnimals);
router.get('/:id', animalController.getAnimalById);
router.post('/', isAuthenticated, animalController.createAnimal);
router.put('/:id', isAuthenticated, animalController.updateAnimal);
router.delete('/:id', isAuthenticated, animalController.deleteAnimal);

module.exports = router;