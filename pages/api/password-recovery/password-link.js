import db from '../../../utils/db';
import postModel from '../../../models/post';
import userModel from '../../../models/user';
import Token from '../../../models/token';
import sendEmail from '../../../utils/sendEmail';
import crypto from 'crypto';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await sendPasswordLink(req, res);
      break;

    default:
      res.status(409).json({ message: 'method does not exist' });
  }
};

export const sendPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    await db.connect();

    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Email does not exist' });

    let newToken = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await newToken.save();

    // const url = `http://localhost:3000/password-reset/${user._id}/${newToken.token}`;
    const url = `https://forumix.vercel.app/password-reset/${user._id}/${newToken.token}`;

    const message = `Click this link to reset your password: \n\n ${url} \n\n If you have not requested this email please ignore`;

    await sendEmail(user.email, 'Password Reset', message);

    await db.disconnect();

    res.status(200).json({
      message: 'password reset link has been sent to your email account',
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error.message);
  }
};
