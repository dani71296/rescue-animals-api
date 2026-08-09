const express = require('express');
const router = express.Router();

const adoptionController = require('../controllers/adoptionController');
const adoptionValidation = require('../middleware/adoptionValidation');
const validateRequest = require('../middleware/validateRequest');
const isAuthenticated = require('../middleware/authenticate.js');


router.get('/', adoptionController.getAllAdoptions);

router.get('/:id', adoptionController.getAdoptionById);

router.post('/',isAuthenticated,adoptionValidation,validateRequest,adoptionController.createAdoption);

router.put('/:id',isAuthenticated,adoptionValidation,validateRequest,adoptionController.updateAdoption);

router.delete('/:id',isAuthenticated,adoptionController.deleteAdoption);

module.exports = router;