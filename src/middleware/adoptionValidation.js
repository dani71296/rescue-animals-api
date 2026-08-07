const { body } = require('express-validator');

const adoptionValidation = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ID'),

    body('animalId')
        .notEmpty()
        .withMessage('Animal ID is required')
        .isMongoId()
        .withMessage('Animal ID must be a valid MongoDB ID'),

    body('status')
        .optional()
        .isIn(['pending', 'under_review', 'approved', 'rejected'])
        .withMessage('Invalid adoption status'),

    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string'),

    body('applicationDate')
        .optional()
        .isISO8601()
        .withMessage('Application date must be a valid date')
];

module.exports = adoptionValidation;