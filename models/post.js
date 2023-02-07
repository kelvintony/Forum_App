import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    community: { type: String, required: true },
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

const post = mongoose.models.post || mongoose.model('post', postSchema);

export default post;
