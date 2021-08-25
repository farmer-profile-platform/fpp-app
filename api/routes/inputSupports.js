const express = require('express');
const {
  getSupports,
  getSupport,
  addSupport,
  updateSupport,
  deleteSuppport
} = require('../controllers/inputSupports');

const InputSupport = require('../models/InputSupport');

const router = express.Router();
const getQuerryFilters = require('../middleware/getQuerryFilters');
const { authenticate, authorize } = require('../middleware/authenticate');

router
  .route('/')
  .get(
    authenticate,
    authorize('editor', 'admin'),
    getQuerryFilters(InputSupport, { path: 'farmer', select: 'name' }),
    getSupports
  )
  .post(authenticate, addSupport)

router
  .route('/:id')
  .get(authenticate, authorize('editor', 'admin'), getSupport)
  .put(authenticate, authorize('editor', 'admin'), updateSupport)
  .delete(authenticate, authorize('editor', 'admin'), deleteSuppport)

module.exports = router;