require('events').EventEmitter.defaultMaxListeners = 0
const express = require('express');
require('./db/mongoose');
var cors = require('cors')
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const likesRouter = require('./routes/likesRouter');
const Post = require('./models/Post');
const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(likesRouter);
app.listen(port);