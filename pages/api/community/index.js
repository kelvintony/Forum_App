import db from '../../../utils/db';
import communityModel from '../../../models/community';

import cloudinary from '../cloudinary-sign';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getAllCommunities(req, res);
      break;
    case 'POST':
      await createCommunity(req, res);
      break;
  }
};

export const createCommunity = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;
  const username = session.user.username;

  const cloudImage = req.body.image;

  const community = req.body;
  // console.log(community);
  try {
    await db.connect();

    if (cloudImage) {
      const uploadRes = await cloudinary.uploader.upload(cloudImage, {
        upload_preset: 'forumiximages',
      });
      if (uploadRes) {
        const newCommunity = new communityModel({
          ...community,
          image: uploadRes.secure_url,
          user: {
            id: userId,
            username: username,
          },
        });
        await newCommunity.save();

        await db.disconnect();

        return res.status(201).json(JSON.stringify(newCommunity));
      }
    } else {
      const newCommunity = new communityModel({
        ...community,
        user: {
          id: userId,
          username: username,
        },
      });
      await newCommunity.save();

      await db.disconnect();

      return res.status(201).json(newCommunity);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};

export const getAllCommunities = async (req, res) => {
  await db.connect();
  try {
    const community = await communityModel.find().sort({ _id: -1 });

    await db.disconnect();
    res.status(200).json(community);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
