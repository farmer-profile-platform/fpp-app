const asyncHandler = require('../middleware/async');
const ErrorHandler = require('../handlers/errorHandler');
const Activity = require('../models/Activity');

// @desc      Get all activities
// @route     GET /api/v1/activities
// @route     GET /api/v1/users/:userId/activities
// @access    Public
exports.getActivities = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const activities = await Activity.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      total: activities.length,
      data: activities
    });
  } else {
    res.status(200).json(res.getQuerryFilters);
  }
});

// @desc      Add activity
// @access    Private
exports.addActivity = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const activity = await Activity.create(req.body);

  res.status(200).json({
    success: true,
    data: activity
  });
});

// @desc      Delete activity
// @route     DELETE /api/v1/activities/:id
// @access    Private
exports.deleteActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return next(
      new ErrorHandler(`No activity with the id of ${req.params.id}`),
      404
    );
  }

  await activity.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});