import userModel from '../../../../../../models/user';
import Token from '../../../../../../models/token';
import bcrypt from 'bcryptjs';
import db from '../../../../../../utils/db';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await passwordReset(req, res);
      break;

    default:
      res.status(409).json({ message: 'method does not exist' });
  }
};

export const passwordReset = async (req, res) => {
  const id = req.query.id;
  const token = req.query.token;

  //   console.log(id, token);
  //   res.json({
  //     id: id,
  //     token: token,
  //   });

  const { password, confirmPassword } = req.body;

  try {
    await db.connect();

    const user = await userModel.findOne({ _id: id });

    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const orderToken = await Token.findOne({
      userId: id,
      token: token,
    });

    if (!orderToken) {
      return res.status(400).json({ message: 'token does not exist' });
    }

    // if (!user.verified) {
    //   user.verified = true;
    // }

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 12);

      user.password = hashedPassword;

      await user.save();

      await orderToken.remove();

      await db.disconnect();

      res.send({ message: 'password reset successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
    console.log(error.message);
  }
};
