const express = require('express');
const router = express.Router();

const adoptionController = require('../controllers/adoptionController');
const isAuthenticated = require('../middleware/authenticate.js');


router.get('/', adoptionController.getAllAdoptions);
router.get('/:id', adoptionController.getAdoptionById);
router.post('/',isAuthenticated, adoptionController.createAdoption);
router.put('/:id',isAuthenticated, adoptionController.updateAdoption);
router.delete('/:id',isAuthenticated, adoptionController.deleteAdoption);

module.exports = router;