const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    role: {
      type: String,
      enum: ['user', 'editor'],
      default: 'user'
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    suspended: {
      type: Boolean,
      default: false
    },
    profile_pic: {
      type: String,
      default: 'no-photo.jpg'
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// jwt
UserSchema.methods.getSignedJwtToken = function (expiryDate) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expiryDate
  });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Reverse populate with virtuals
UserSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

module.exports = mongoose.model('User', UserSchema);