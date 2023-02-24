import db from '../../../utils/db';
import communityModel from '../../../models/community';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'PUT':
      await editPost(req, res);
      break;

    case 'GET':
      await getCommunity(req, res);
      break;

    case 'DELETE':
      await deletePost(req, res);
      break;
  }
};

export const getCommunity = async (req, res) => {
  try {
    await db.connect();

    const community = await communityModel.findById(req.query.id);

    await db.disconnect();
    res.status(200).json(community);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  try {
    await db.connect();
    const id = req.query.id;
    const updatedData = req.body;
    const options = { new: true };
    const data = await communityModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    await db.disconnect();
    res.status(200).json({ message: 'updated successfully', data });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const deletePost = async (req, res) => {
  const id = req.query.id;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  try {
    await communityModel.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
