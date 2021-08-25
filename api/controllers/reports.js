const Farmer = require('../models/Farmer');
const User = require('../models/User');
const InputSupport = require('../models/InputSupport');
const Activity = require('../models/Activity');
const mongoose = require('mongoose');

// @desc      Get all farmers
// @route     GET /api/v1/dashboard/reports
// @access    Public
exports.getDashboardReports = async (req, res, next) => {
  try {
    const farmers = await Farmer.find().populate({
      path: 'inputSupports'
    })
    const usersTotal = await User.countDocuments();
    const inputSupports = await InputSupport.find();

    const inputYearlyData = await InputSupport.aggregate(
      [
        { $group: { _id: "$year", total: { $sum: "$grand_total" } } },
        { $project: { y: "$total", label: "$_id" } }
      ]
    )

    const inputSuportTypes = await InputSupport.aggregate(
      [
        { $unwind: "$inputs" },
        { $group: { _id: "$inputs.type", total: { $sum: "$inputs.total" } } },
        { $project: { y: "$total", name: "$_id" } }
      ]
    )

    // get farmers supported
    let farmersSupport = farmers.filter(function (farmer) {
      return farmer.inputSupports.length > 0
    })

    if (inputSupports.length > 0) {
      // get total amount for input supports
      totalAmountSupported = inputSupports.reduce((a, b) => ({
        grand_total: a.grand_total + b.grand_total
      })).grand_total;
    } else {
      totalAmountSupported = 0;
    }

    const reports = {}
    reports.totalFarmers = farmers.length;
    reports.totalSupports = farmersSupport.length;
    reports.usersTotal = usersTotal;
    reports.totalAmountSupported = totalAmountSupported;
    reports.supportsYearly = inputYearlyData;
    reports.inputSupportTypes = inputSuportTypes

    res.status(200).json({
      success: true,
      data: reports
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error getting reports."
    })
  }
};

exports.getFarmerReports = async (req, res, next) => {
  try {

    const ObjectId = mongoose.Types.ObjectId;

    const inputSupport = await InputSupport.aggregate(
      [
        { $match: { "farmer": ObjectId(req.params.farmerId) } },
        { $group: { _id: "$year", total: { $sum: "$grand_total" } } },
        { $project: { y: "$total", label: "$_id" } }
      ]
    );

    const harvestIncome = await Farmer.aggregate(
      [
        { $match: { "_id": ObjectId(req.params.farmerId) } },
        { $unwind: "$harvestYield" },
        { $unwind: "$harvestYield.years" },
        { $group: { _id: "$harvestYield.years.year", total: { $sum: "$harvestYield.years.yearly_income" } } },
        { $project: { y: "$total", label: "$_id" }, }
      ]
    )

    const harvestedBags = await Farmer.aggregate(
      [
        { $match: { "_id": ObjectId(req.params.farmerId) } },
        { $unwind: "$harvestYield" },
        { $unwind: "$harvestYield.years" },
        { $group: { _id: "$harvestYield.years.year", total: { $sum: "$harvestYield.years.yearly_harvest" } } },
        { $project: { y: "$total", label: "$_id" }, }
      ]
    )

    const compare = (a, b) => {
      if (a._id < b._id) {
        return -1;
      }
      if (a._id > b._id) {
        return 1;
      }
      return 0;
    }

    harvestIncome.sort(compare);
    harvestedBags.sort(compare);
    inputSupport.sort(compare);

    const report = {}
    report.harvestIncome = harvestIncome;
    report.inputSupport = inputSupport;
    report.harvestedBags = harvestedBags;

    res.status(200).json({
      success: true,
      data: report
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error getting farmer reports."
    })
  }

}

exports.getUserReports = async (req, res, next) => {
  try {

    const userAddedfarmers = await Farmer.find({ user: req.params.userId });

    const userActivities = await Activity.find({ user: req.params.userId });

    const reports = {}
    reports.userAddedfarmers = userAddedfarmers.length;
    reports.userActivities = userActivities.length;

    res.status(200).json({
      success: true,
      data: reports
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error getting user dashboard"
    })
  }

}