import db from '../../../utils/db';
import commentModel from '../../../models/comment';

import { getSession } from 'next-auth/react';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getComment(req, res);
      break;

    // case 'PUT':
    //   await editPost(req, res);
    //   break;

    // case 'DELETE':
    //   await deletePost(req, res);
    //   break;
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

// export const editPost = async (req, res) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).send('you are not authenticated');
//   }
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
//         const data = await commentModel.findByIdAndUpdate(
//           id,
//           updatedData,
//           options
//         );

//         await db.disconnect();
//         res.status(200).json({ message: 'updated successfully', data });
//       }
//     } else {
//       await db.connect();
//       const id = req.query.id;
//       const updatedData = req.body;
//       const options = { new: true };
//       const data = await postModel.findByIdAndUpdate(id, updatedData, options);

//       await db.disconnect();
//       res.status(200).json({ message: 'updated successfully', data });
//     }
//   } catch (error) {
//     await db.disconnect();
//     res.status(500).json({ message: 'something went wrong' });
//   }
// };

// export const deletePost = async (req, res) => {
//   const id = req.query.id;

//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).send('you are not authenticated');
//   }

//   try {
//     await postModel.findByIdAndRemove(id);
//     res.json({ message: 'Post deleted successfully.' });
//   } catch (error) {
//     res.status(409).json({ message: error });
//   }
// };
