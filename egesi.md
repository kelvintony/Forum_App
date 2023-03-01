```js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import morgan from 'morgan';

//importing routers
// import postRoute from './routes/postRoute.js';

const app = express();

// app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// app.use('/posts', postRoute);

const MONGOBD_URL =
  'mongodb+srv://kelvintony:qwertyuiop@cluster0.ql55m.mongodb.net/project-x?retryWrites=true&w=majority';
const port = 5000;

mongoose
  .connect(MONGOBD_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is lstening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

// app.get('/', (req, res) => {
// 	res.send('Server is now live!!!');
// });
// mongodb://localhost:27017
```
