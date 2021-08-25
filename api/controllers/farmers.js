const path = require('path');
const fs = require('fs')
const base64Img = require('base64-img');
const asyncHandler = require('../middleware/async');
const ErrorHandler = require('../handlers/errorHandler');
const Farmer = require('../models/Farmer');


// @desc      Get all farmers
// @route     GET /api/v1/farmers
// @access    Public
exports.getFarmers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.getQuerryFilters);
});


// @desc      Get single farmer
// @route     GET /api/v1/farmers/:id
// @access    Public
exports.getFarmer = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate(
      [{ path: 'inputSupports' }, { path: 'user', select: 'name' }]
    );

    if (!farmer) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: farmer });
  } catch (err) {
    next(err);
  }
};

// @desc      Create new farmer
// @route     POST /api/v1/farmers
// @access    Public
exports.createFarmer = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.constructor.name === "Array") {
      req.body.map(function (farmer) {
        farmer.user = req.user.id
        return farmer;
      })
    } else {
      req.body.user = req.user.id
    }

    const farmer = await Farmer.create(req.body);

    res.status(201).json({
      success: true,
      data: farmer
    });
  } catch (err) {
    next(err);
  }
});

// @desc      Update farmer
// @route     PUT /api/v1/farmer/:id
// @access    Private
exports.updateFarmer = async (req, res, next) => {
  const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!farmer) {
    return next(
      new ErrorHandler(`Farmer not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: farmer });
};

// @desc      Delete farmer
// @route     DELETE /api/v1/farmers/:id
// @access    Private
exports.deleteFarmer = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

    farmer.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc      Get all farmers with support
// @route     GET /api/v1/farmers/support
// @access    Private/Admin
exports.getFarmersWithSupport = async (req, res, next) => {
  const farmers = await Farmer.find().populate({
    path: 'inputSupports'
  })

  let inputsSupport = farmers.filter(function (farmer) {
    return farmer.inputSupports.length > 0
  })
  res.status(200).json({
    success: true,
    total: inputsSupport.length,
    data: inputsSupport
  });
};

// @desc      Upload files for farmer
// @route     PUT /api/v1/farmers/upload
// @access    Private
exports.farmerFileUpload = asyncHandler(async (req, res, next) => {

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorHandler(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorHandler(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `img_${file.name}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorHandler(`Problem with file upload`, 500));
    }

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});


const saveFile = (newFile, name) => {
  const file = newFile;
  // let fileName = '';

  base64Img.img(file, `${process.env.FILE_UPLOAD_PATH}`, `img1_${name}`, function (err, filepath) {
    if (err) {
      console.error(err);
    }

    const pathArr = filepath.split('/');
    const fileName = pathArr[pathArr.length - 1]
    return fileName;
  })
}