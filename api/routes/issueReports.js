const express = require('express');
const {
  getIssues,
  addIssue,
  deleteIssue
} = require('../controllers/issueReports');

const IssueReport = require('../models/IssueReport');

const router = express.Router({ mergeParams: true });
const getQuerryFilters = require('../middleware/getQuerryFilters');
const { authenticate, authorize } = require('../middleware/authenticate');

router.use(authenticate);

router
  .route('/')
  .get(
    authorize('admin', 'editor'),
    getQuerryFilters(IssueReport, { path: 'user', select: 'name' }),
    getIssues
  )
  .post(addIssue);

router
  .route('/:id')
  .delete(authorize('admin'), deleteIssue);

module.exports = router;