const Report = require('../models/Report');
const User = require('../models/User');
const mongoose = require('mongoose');

// GET /reports - Obtener todos los reportes
exports.getAllReports = async (req, res, next) => {
    // #swagger.tags = ['Reports'];
    // #swagger.description = 'Endpoint to retrieve all reports from the database.';
    try {
        const reports = await Report.find().populate('userId', 'name email phone');
        res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
};

// GET /reports/:id - Obtener un reporte por ID
exports.getReportById = async (req, res, next) => {
    // #swagger.tags = ['Reports'];
    // #swagger.description = 'Endpoint to retrieve a report by ID.';
    try {
        const reportId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ message: 'Invalid report ID' });
        }
        const report = await Report.findById(reportId).populate('userId', 'name email phone');
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};

// POST /reports - Crear un nuevo reporte
exports.createReport = async (req, res, next) => {
    /*  #swagger.tags = ['Reports']
        #swagger.description = 'Endpoint to create a new report in the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'New Report details',
            required: true,
            schema: {
                $userId: '65f1a2b3c4d5e6f7a8b9c0d1',
                $location: 'Av. Siempre Viva 742',
                $description: 'Perro herido en la vía pública',
                $animalType: 'Dog',
                $contactPhone: '5555-9999',
                status: 'pending'
            }
        }
    */
    const { userId, location, description, animalType, status, contactPhone, incidentDate } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Referenced user not found' });
        }

        const report = {
            userId,
            location,
            description,
            animalType,
            status: status || 'pending',
            contactPhone,
            incidentDate: incidentDate || Date.now()
        };

        const newReport = new Report(report);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        console.error('Error creating report:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error in provided data',
                errors: error.errors
            });
        }
        next(error);
    }
};

// PUT /reports/:id - Actualizar un reporte
exports.updateReport = async (req, res, next) => {
    /*  #swagger.tags = ['Reports']
        #swagger.description = 'Endpoint to update a report in the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Report data to update',
            required: true,
            schema: {
                location: 'Av. Siempre Viva 742',
                description: 'Perro herido en la vía pública, ya fue asistido',
                animalType: 'Dog',
                status: 'in_progress',
                contactPhone: '5555-9999'
            }
        }
    */
    const reportId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
        return res.status(400).json({ message: 'Invalid report ID' });
    }

    const { userId, location, description, animalType, status, contactPhone, incidentDate } = req.body;

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    try {
        if (userId) {
            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(404).json({ message: 'Referenced user not found' });
            }
        }

        const updateData = {
            ...(userId && { userId }),
            ...(location && { location }),
            ...(description && { description }),
            ...(animalType && { animalType }),
            ...(status && { status }),
            ...(contactPhone && { contactPhone }),
            ...(incidentDate && { incidentDate })
        };

        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error('Error updating report:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error in provided data',
                errors: error.errors
            });
        }
        next(error);
    }
};

// DELETE /reports/:id - Eliminar un reporte
exports.deleteReport = async (req, res, next) => {
    // #swagger.tags = ['Reports'];
    // #swagger.description = 'Endpoint to delete a report from the database.';
    try {
        const reportId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ message: 'Invalid report ID' });
        }
        const deletedReport = await Report.findByIdAndDelete(reportId);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report successfully deleted' });
    } catch (error) {
        next(error);
    }
};
