const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    // Aquí puedes buscar o guardar el usuario en tu base de datos si lo requieres.
    return done(null, profile);
}));

// Guardar los datos del usuario en la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

// Recuperar los datos del usuario de la sesión
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
