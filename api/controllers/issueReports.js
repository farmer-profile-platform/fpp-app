const asyncHandler = require('../middleware/async');
const ErrorHandler = require('../handlers/errorHandler');
const IssueReport = require('../models/IssueReport');

// @desc      Get all issues
// @route     GET /api/v1/issues
// @route     GET /api/v1/users/:userId/issues
// @access    Public
exports.getIssues = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const issues = await IssueReport.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } else {
    res.status(200).json(res.getQuerryFilters);
  }
});

// @desc      Add issues
// @route     POST /api/v1/issues
exports.addIssue = asyncHandler(async (req, res, next) => {
  try {
    req.body.user = req.user.id

    const issue = await IssueReport.create(req.body);

    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete issue
// @route     DELETE /api/v1/issue/:id
// @access    Private
exports.deleteIssue = asyncHandler(async (req, res, next) => {
  const issue = await IssueReport.findById(req.params.id);

  if (!issue) {
    return next(
      new ErrorHandler(`No issue with the id of ${req.params.id}`),
      404
    );
  }

  await issue.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});