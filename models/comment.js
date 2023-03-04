import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      id: { type: String, required: true },
      username: { type: String, required: true },
      image: { type: String },
    },
    numberOfSubPost: {
      type: Number,
      default: 0,
    },
    subPost: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const comment =
  mongoose.models.comment || mongoose.model('comment', commentSchema);

export default comment;
