import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema(
  {
    interestName: { type: String, required: true },
    description: { type: String, required: true },
    creator: {
      id: { type: String, required: true },
      username: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const interest =
  mongoose.models.interest || mongoose.model('interest', interestSchema);

export default interest;
