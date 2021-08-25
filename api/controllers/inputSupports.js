const asyncHandler = require('../middleware/async');
const ErrorHandler = require('../handlers/errorHandler');
const InputSupport = require('../models/InputSupport');
const Farmer = require('../models/Farmer');

// @desc      Get all supports
// @route     GET /api/v1/supports
// @access    Public
exports.getSupports = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.getQuerryFilters);
});

// @desc      Get single support
// @route     GET /api/v1/support/:id
// @access    Public
exports.getSupport = asyncHandler(async (req, res, next) => {
  const support = await InputSupport.findById(req.params.id).populate({
    path: 'farmer',
    select: 'firstName'
  });

  if (!support) {
    return next(
      new ErrorHandler(`No input support with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: support
  });
});

// @desc      Add supports
// @route     POST /api/v1/supports
// @access    Public
exports.addSupport = asyncHandler(async (req, res, next) => {

  const support = await InputSupport.create(req.body);

  await Farmer.findByIdAndUpdate(support.farmer, { $push: { inputSupports: support._id } }, {
    new: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    data: support
  });
});

// @desc      Update support
// @route     PUT /api/v1/support/:id
// @access    Private
exports.updateSupport = async (req, res, next) => {
  const support = await InputSupport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!support) {
    return next(
      new ErrorHandler(`Support not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: support });
};

// @desc      Delete support
// @route     DELETE /api/v1/support/:id
// @access    Private
exports.deleteSuppport = async (req, res, next) => {
  try {
    const suppport = await InputSupport.findById(req.params.id);

    suppport.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
