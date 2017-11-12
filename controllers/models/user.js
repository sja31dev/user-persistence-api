// Mongoose Schema for a user
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {type: String, required: true },
    forename: {type: String, required: true },
    surname: {type: String, required: true },
    created: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

// Make sure the created parameter is set
UserSchema.pre('save', next => {
  now = new Date();
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);
