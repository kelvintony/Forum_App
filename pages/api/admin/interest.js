import { getSession } from 'next-auth/react';
import interestModel from '../../../models/interest';
import db from '../../../utils/db';

// const handler = async (req, res) => {
//   if (req.method === 'GET') {
//     return getHandler(req, res);
//   } else if (req.method === 'POST') {
//     return postHandler(req, res);
//   } else {
//     return res.status(400).send({ message: 'Method not allowed' });
//   }
// };

export default async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export const postHandler = async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session || !session.user.isAdmin) {
      return res.status(401).send('admin signin required');
    }

    const userId = session.user._id;
    const username = session.user.username;

    await db.connect();

    const newInterest = new interestModel({
      interestName: req.body.interestName,
      description: req.body.description,
      creator: username,
    });

    const interest = await newInterest.save();
    await db.disconnect();
    res.send(interest);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};

export const getHandler = async (req, res) => {
  try {
    await db.connect();
    const interests = await interestModel.find().sort({ _id: -1 });
    await db.disconnect();
    res.send(interests);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error.message);
  }
};
