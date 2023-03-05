import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, default: false },
    displayName: { type: String },
    about: { type: String },
    language: { type: String },
    country: { type: String },
    gender: { type: String },
    image: { type: String },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
    twitterUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.models.user || mongoose.model('user', userSchema);

export default user;
