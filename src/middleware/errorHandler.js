// Middleware centralizado para el manejo global de errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // ID con formato invalido (ej: /animals/abc) -> Mongoose lanza CastError
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: `Invalid ${err.path}: '${err.value}' is not a valid identifier`
        });
    }

    // Campo unique duplicado (ej: dos usuarios con el mismo email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0];
        return res.status(409).json({
            message: `Duplicate value: a record with that ${field} already exists`,
            field
        });
    }

    // Falla de validacion del esquema (campos requeridos, tipos, etc.)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error in provided data',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = errorHandler;
