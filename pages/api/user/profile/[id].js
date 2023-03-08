import db from '../../../../utils/db';
import userModel from '../../../../models/user';

import cloudinary from '../../cloudinary-sign';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getUser(req, res);
      break;
  }
};

export const getUser = async (req, res) => {
  const session = await getSession({ req });

  //   if (!session) {
  //     return res.status(401).send('you are not authenticated');
  //   }
  const id = req.query.id;

  //   const userId = session.user._id;
  //   const username = session.user.username;

  try {
    await db.connect();

    const post = await userModel.findById(id);

    const { password, ...others } = post._doc;

    await db.disconnect();
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const editUser = async (req, res) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).send('you are not authenticated');
//   }
//   const userId = session.user._id;

//   const cloudImage = req.body.image;

//   try {
//     await db.connect();

//     if (cloudImage) {
//       const uploadRes = await cloudinary.uploader.upload(cloudImage, {
//         upload_preset: 'forumiximages',
//       });
//       if (uploadRes) {
//         const id = req.query.id;
//         const updatedData = {
//           ...req.body,
//           image: uploadRes.secure_url,
//         };
//         const options = { new: true };
//         const data = await userModel.findByIdAndUpdate(
//           id,
//           updatedData,
//           options
//         );

//         await db.disconnect();
//         res.status(200).json(data);
//       }
//     } else {
//       await db.connect();
//       const updatedData = req.body;
//       const options = { new: true };
//       const data = await userModel.findByIdAndUpdate(
//         userId,
//         updatedData,
//         options
//       );

//       await db.disconnect();
//       res.status(200).json(data);
//     }
//   } catch (error) {
//     await db.disconnect();
//     res.status(500).json({ message: 'something went wrong' });
//   }
// };

// export const deleteUser = async (req, res) => {
//   const id = req.query.id;

//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).send('you are not authenticated');
//   }

//   try {
//     await userModel.findByIdAndRemove(id);
//     res.json({ message: 'Post deleted successfully.' });
//   } catch (error) {
//     res.status(409).json({ message: error });
//   }
// };
