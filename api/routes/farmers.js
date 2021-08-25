const express = require('express');
const {
  createFarmer,
  getFarmers,
  getFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmersWithSupport,
  farmerFileUpload
} = require('../controllers/farmers');

const Farmer = require('../models/Farmer');
const getQuerryFilters = require('../middleware/getQuerryFilters');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authenticate');

router
  .route('/')
  .get(
    authenticate,
    authorize('editor', 'admin'),
    getQuerryFilters(Farmer, "inputSupports"),
    getFarmers
  )
  .post(authenticate, authorize('editor', 'admin'), createFarmer);

router.get('/support', authenticate, getFarmersWithSupport);
router.post('/upload', authenticate, farmerFileUpload);

router
  .route('/:id')
  .get(authenticate, authorize('editor', 'admin'), getFarmer)
  .put(authenticate, authorize('editor', 'admin'), updateFarmer)
  .delete(authenticate, authorize('admin'), deleteFarmer);

module.exports = router;