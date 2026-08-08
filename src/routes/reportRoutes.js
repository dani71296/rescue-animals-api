const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const isAuthenticated = require('../middleware/authenticate.js');


router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/',isAuthenticated, reportController.createReport);
router.put('/:id',isAuthenticated, reportController.updateReport);
router.delete('/:id',isAuthenticated, reportController.deleteReport);

module.exports = router;
