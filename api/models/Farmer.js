const mongoose = require('mongoose');
const slugify = require('slugify');
// const InputSupport = require('./InputSupport');

const FarmerSchema = new mongoose.Schema(
  {
    farmerId: String,
    title: String,
    firstName: String,
    lastName: String,
    name: String,
    slug: String,
    aka: String,
    dob: {
      type: Date,
      default: Date.now
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '0200200200'
    },
    e_address: {
      type: String,
      default: 'Not provided'
    },
    marital_status: {
      type: String,
      default: 'Single'
    },
    hometown: String,
    nationality: String,
    education: {
      type: String,
      default: 'None'
    },
    townOfResidence: String,
    res_address: String,
    fbo_position: String,
    fboMember_name: String,
    national_id: String,
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    id_number: {
      type: String,
      sparse: true
    },
    fingerprint: {
      type: String,
      default: 'no-photo.jpg'
    },
    idCard: {
      type: String,
      default: 'no-photo.jpg'
    },
    num_children: Number,
    years_farming: Number,
    farmLandOwnershipType: String,
    num_farmLands: Number,
    farm_location: String,
    fsp_type: String,
    spouse: [{}],
    children: [{}],
    harvestYield: [{}],
    bank: [{}],
    momo: [{}],
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    inputSupports: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InputSupport',
    }]
  },
);

FarmerSchema.pre('save', function (next) {
  this.name = this.firstName + ' ' + this.lastName;
  this.slug = slugify(this.aka, { lower: true });

  // Get unique ID
  // "id".substring(4, 9).toUpperCase();
  let fpp = "FPP-"
  let userString = Math.random().toString(36).substring(7).toUpperCase();
  let regYear = new Date(this.createdAt).getFullYear().toString().substring(2)
  this.farmerId = fpp + userString + "-" + regYear

  next();
});

module.exports = mongoose.model('Farmer', FarmerSchema);