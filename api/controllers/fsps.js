const asyncHandler = require('../middleware/async');
const ErrorHandler = require('../handlers/errorHandler');
const Fsp = require('../models/Fsp');

// @desc      Get all fsps
// @route     GET /api/v1/fsps
// @access    Public
exports.getFsps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.getQuerryFilters);
});

// @desc      Add fsp
// @route     POST /api/v1/fsps
exports.addFsp = asyncHandler(async (req, res, next) => {
  const fsp = await Fsp.create(req.body);

  res.status(200).json({
    success: true,
    data: fsp
  });
});

// @desc      Delete fsp
// @route     DELETE /api/v1/fsp/:id
// @access    Private
exports.deleteFsp = asyncHandler(async (req, res, next) => {
  const fsp = await Fsp.findById(req.params.id);

  if (!fsp) {
    return next(
      new ErrorHandler(`No fsp with the id of ${req.params.id}`),
      404
    );
  }

  await fsp.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});