const express = require('express');
const animalRoutes = require('./animalRoutes');
const userRoutes = require('./userRoutes');
const adoptionRoutes = require('./adoptionRoutes');
const reportRoutes = require('./reportRoutes');
const swaggerRoutes = require('./swagger');
const passport = require('../middleware/passport-google.js')

const router = express.Router();

router.use('/', swaggerRoutes);
router.use('/animals', animalRoutes);
router.use('/users', userRoutes);
router.use('/adoptions', adoptionRoutes);
router.use('/reports', reportRoutes);


router.get('/login', passport.authenticate('google'),(req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


// router.get('/', (req, res) => {
//     res.send('Animal Rescue API is running correctly');
// });

module.exports = router;
 