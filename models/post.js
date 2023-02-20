import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    community: { type: String, required: true },
    image: { type: String },
    user: {
      id: { type: String, required: true },
      username: { type: String, required: true },
      image: { type: String },
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    // likeCount: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.models.post || mongoose.model('post', postSchema);

export default post;
