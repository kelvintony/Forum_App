import db from '../../../../utils/db';
import commentModel from '../../../../models/comment';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'request error' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;

  const id = req.query.id;
  await db.connect();

  if (!id) {
    return res.status(404).send('post id not found');
  }

  try {
    const post = await commentModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      },
      { new: true }
    );

    await db.disconnect();
    res.json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
    // console.log(error.message);
  }
}
