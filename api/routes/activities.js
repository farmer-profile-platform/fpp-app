const express = require('express');
const {
  getActivities,
  addActivity,
  deleteActivity
} = require('../controllers/activities');

const Activity = require('../models/Activity');

const router = express.Router({ mergeParams: true });
const getQuerryFilters = require('../middleware/getQuerryFilters');
const { authenticate, authorize } = require('../middleware/authenticate');

router
  .route('/')
  .get(
    authenticate,
    authorize('editor', 'admin'),
    getQuerryFilters(Activity, { path: 'user', select: 'name' }),
    getActivities
  )
  .post(authenticate, authorize('editor', 'admin'), addActivity);

router
  .route('/:id')
  .delete(authenticate, authorize('admin'), deleteActivity);

module.exports = router;