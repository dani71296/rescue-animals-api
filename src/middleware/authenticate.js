export const isAuthenticated = (req, res, next) => {
    // Es recomendable usar el método nativo de passport o verificar req.session.passport
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json("You do not have access.");
    }
    next();
};
