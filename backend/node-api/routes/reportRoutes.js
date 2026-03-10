const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/excel', reportController.exportExcel);
router.get('/pdf', reportController.exportPDF);

module.exports = router;
