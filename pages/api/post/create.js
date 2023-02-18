import db from '../../../utils/db';
import postModel from '../../../models/post';

import cloudinary from '../cloudinary-sign';

import { getSession } from 'next-auth/react';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getAllPost(req, res);
      break;
    case 'POST':
      await createPost(req, res);
      break;
  }
};

export const createPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;
  const username = session.user.username;

  const cloudImage = req.body.image;
  // console.log('coming from post route', session);
  // console.log(session);

  const post = req.body;
  // console.log(post);
  try {
    await db.connect();

    if (cloudImage) {
      const uploadRes = await cloudinary.uploader.upload(cloudImage, {
        upload_preset: 'forumiximages',
      });
      if (uploadRes) {
        const newPost = new postModel({
          ...post,
          image: uploadRes.secure_url,
          user: {
            id: userId,
            username: username,
          },
        });
        await newPost.save();

        await db.disconnect();

        return res.status(201).json(JSON.stringify(newPost));
      }
    } else {
      const newPost = new postModel({
        ...post,
        user: {
          id: userId,
          username: username,
        },
      });
      await newPost.save();

      await db.disconnect();

      return res.status(201).json(JSON.stringify(newPost));
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};

export const getAllPost = async (req, res) => {
  await db.connect();
  try {
    const posts = await postModel.find();

    await db.disconnect();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
