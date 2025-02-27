const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');


mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

const Comment = require("./models/journal.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get('/journal', async (req, res) => {
  const allComments = await Comment.find();
  console.log(allComments)
  res.render('journal/index.ejs', { Comments: allComments });
})

app.get('/journal/new', async (req, res) => {
  res.render('new.ejs')
  console.log('New Page functional')
})

app.post('/journal', async (req, res) => {
  console.log('New journal added')
  await Comment.create(req.body);
  res.redirect('/journal');
})

app.get('/journal/:commentsId', async (req, res) => {
  const foundComment = await Comment.findById(req.params.commentsId)
  res.render('journal/show.ejs', { comment: foundComment });
})

app.delete('/journal/:commentsId', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentsId)
  res.redirect('/journal')
})

app.get('/journal/:commentsId/edit', async (req, res) => {
  const foundComment = await Comment.findById(req.params.commentsId);
  console.log(foundComment)
  res.render('journal/edit.ejs', {
    comment: foundComment,
  })
})

app.put('/journal/:commentsId', async (req, res) => {
  await Comment.findByIdAndUpdate(req.params.commentsId, req.body)
  res.redirect(`/journal/${req.params.commentsId}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});