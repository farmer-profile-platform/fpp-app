const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userPhotoUpload
} = require('../controllers/users');

const User = require('../models/User');

// Include other resource routers
const activityRouter = require('./activities');
const issuesRouter = require('./issueReports');

const router = express.Router();
const getQuerryFilters = require('../middleware/getQuerryFilters');
const { authenticate, authorize } = require('../middleware/authenticate');

router.use(authenticate);

// Re-route into other resource routers
router.use('/:userId/activities', activityRouter);
router.use('/:userId/issues', issuesRouter);

router
  .route('/')
  .get(authorize('admin'), getQuerryFilters(User), getUsers)
  .post(authorize('admin'), createUser);

router
  .route('/:id')
  .get(authorize('admin', 'editor'), getUser)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

router.route('/:id/photo').put(userPhotoUpload);

module.exports = router;