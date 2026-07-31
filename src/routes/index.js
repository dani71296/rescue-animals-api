const express = require('express');
const animalRoutes = require('./animalRoutes');
const userRoutes = require('./userRoutes');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/', swaggerRoutes);
router.use('/animals', animalRoutes);
router.use('/users', userRoutes);

router.get('/', (req, res) => {
    res.send('Animal Rescue API is running correctly');
});

module.exports = router;
