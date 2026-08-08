const express = require('express');
const router = express.Router();

const adoptionController = require('../controllers/adoptionController');
const adoptionValidation = require('../middleware/adoptionValidation');
const validateRequest = require('../middleware/validateRequest');

router.get('/', adoptionController.getAllAdoptions);

router.get('/:id', adoptionController.getAdoptionById);

router.post('/',adoptionValidation,validateRequest,adoptionController.createAdoption);

router.put('/:id',adoptionValidation,validateRequest,adoptionController.updateAdoption);

router.delete('/:id', adoptionController.deleteAdoption);

module.exports = router;