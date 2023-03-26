import db from '../../../../utils/db';
import userModel from '../../../../models/user';
import postModel from '../../../../models/post';
import repliedcommentModel from '../../../../models/repliedcomment';
import commentModel from '../../../../models/comment';
import communityModel from '../../../../models/community';

import cloudinary from '../../cloudinary-sign';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getUser(req, res);
      break;

    case 'PUT':
      await editUser(req, res);
      break;

    case 'DELETE':
      await deleteUser(req, res);
      break;
  }
};

export const getUser = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;
  const username = session.user.username;

  try {
    await db.connect();

    const post = await userModel.findById(userId);

    const { password, ...others } = post._doc;

    await db.disconnect();
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }
  const userId = session.user._id;

  const cloudImage = req.body.image;

  const emptyData = {};

  try {
    await db.connect();

    if (cloudImage) {
      const uploadRes = await cloudinary.uploader.upload(cloudImage, {
        upload_preset: 'forumiximages',
      });
      if (uploadRes) {
        // const id = req.query.id;
        const updatedData = {
          ...req.body,
          image: uploadRes.secure_url,
        };

        // console.log(uploadRes.secure_url);
        const options = { new: true };
        const data = await userModel.findByIdAndUpdate(
          userId,
          updatedData,
          options
        );

        // session.user.image = uploadRes.secure_url;
        // console.log('my session image', session.user.image);

        // const myPost = await postModel.findOne({ 'user.id': userId });
        //
        // if (myPost) {
        //   myPost.user.image = uploadRes.secure_url;
        //   await myPost.save();
        // }

        await db.disconnect();
        res.status(200).json(data);
      }
    } else {
      await db.connect();
      const updatedData = req.body;
      const options = { new: true };
      const data = await userModel.findByIdAndUpdate(
        userId,
        updatedData,
        options
      );

      await db.disconnect();
      res.status(200).json(data);
    }
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'something went wrong' });
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.query.id;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  try {
    await userModel.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
