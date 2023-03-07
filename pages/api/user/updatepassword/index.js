import { getSession } from 'next-auth/react';

import bcryptjs from 'bcryptjs';
import userModel from '../../../../models/user';
import db from '../../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { oldPassword, newPassword } = req.body;

  const userId = session.user._id;

  try {
    await db.connect();

    const oldUser = await userModel.findOne({ _id: userId });

    const isPasswordCorrect = bcryptjs.compareSync(
      oldPassword,
      oldUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send('Old password is incorrect');
    }

    if (!newPassword) {
      return res.status(400).send('new password required');
    }

    if (newPassword) {
      oldUser.password = bcryptjs.hashSync(newPassword);
    }

    await oldUser.save();

    await db.disconnect();

    return res.status(200).send('password updated successfully');
  } catch (error) {
    await db.disconnect();

    res.status(500).json({ message: 'something went wrong' });
  }
}

export default handler;
