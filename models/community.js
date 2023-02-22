import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    interest: { type: String, required: true },
    communityName: { type: String, required: true },
    communityType: { type: String, required: true },
    image: { type: String },
    user: {
      id: { type: String, required: true },
      username: { type: String, required: true },
      image: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const community =
  mongoose.models.community || mongoose.model('community', communitySchema);

export default community;
