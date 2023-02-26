import db from '../../../../utils/db';
import communityModel from '../../../../models/community';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'PUT':
      await joinCommunity(req, res);
      break;

    default:
      res.send({ message: 'Method not allowed' });
      break;
  }
};

export const joinCommunity = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('you are not authenticated');
  }

  const userId = session.user._id;
  // const username = session.user.username;

  try {
    await db.connect();

    await communityModel.findByIdAndUpdate(req.query.id, {
      $push: { subscribedUsers: userId },
    });

    await communityModel.findByIdAndUpdate(req.query.id, {
      $inc: { subscribers: 1 },
    });

    await db.disconnect();

    res.status(200).json({ message: 'Subscription successfull.' });
    // res.json(community);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};
