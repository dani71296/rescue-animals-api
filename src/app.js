const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const routes = require('./routes/index');
const session = require('express-session');
const passport = require('./middleware/passport-google.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a la Base de Datos
connectDB();

// Middleware para procesar JSON
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
})),
    app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/', routes)
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/')
    });


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;