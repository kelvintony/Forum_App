import db from '../../../utils/db';
import commentModel from '../../../models/comment';
import replyCommentModel from '../../../models/repliedcomment';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getComment(req, res);
      break;
    case 'DELETE':
      await deleteComment(req, res);
      break;
    case 'PUT':
      await editComment(req, res);
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

export const deleteComment = async (req, res) => {
  const id = req.query.id;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  try {
    await commentModel.findByIdAndRemove(id);
    await replyCommentModel.deleteMany({ commentId: id });
    res.json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
export const editComment = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  try {
    await db.connect();

    const id = req.query.id;
    const updatedData = req.body;
    const options = { new: true };
    const data = await commentModel.findByIdAndUpdate(id, updatedData, options);

    await db.disconnect();
    res.status(200).json(data);
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: 'something went wrong' });
  }
};
