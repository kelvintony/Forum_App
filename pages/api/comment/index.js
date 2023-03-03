import db from '../../../utils/db';
import commentModel from '../../../models/comment';

import { getSession } from 'next-auth/react';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getAllComment(req, res);
      break;
    case 'POST':
      await createComment(req, res);
      break;
  }
};

export const createComment = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;
  const username = session.user.username;

  const comment = req.body;
  try {
    await db.connect();

    const newComment = new commentModel({
      ...comment,
      user: {
        id: userId,
        username: username,
      },
    });
    await newComment.save();

    await db.disconnect();

    return res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};

export const getAllComment = async (req, res) => {
  await db.connect();
  try {
    const comments = await commentModel.find();

    await db.disconnect();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
