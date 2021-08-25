const express = require('express');
const { getDashboardReports, getFarmerReports, getUserReports } = require('../controllers/reports');

const router = express.Router();
const { authenticate } = require('../middleware/authenticate');

router
  .route('/')
  .get(authenticate, getDashboardReports)

router.get('/farmer/:farmerId', authenticate, getFarmerReports);

router.get('/user/:userId', authenticate, getUserReports);

module.exports = router;