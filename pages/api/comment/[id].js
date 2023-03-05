import db from '../../../utils/db';
import commentModel from '../../../models/comment';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getComment(req, res);
      break;

    default:
      res.status(409).json({ message: 'method does not exist' });
  }
};

export const getComment = async (req, res) => {
  try {
    await db.connect();

    const comment = await commentModel.findById(req.query.id);

    await db.disconnect();
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
