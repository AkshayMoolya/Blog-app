const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

connectDB();
const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const doc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(doc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const doc = await User.findOne({ username });

  if (!doc) {
    res.status(404).json("wrong credentials");
  } else {
    const passok = bcrypt.compareSync(password, doc.password);
    if (passok) {
      jwt.sign(
        { username, id: doc._id },
        process.env.SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: doc._id,
            username,
          });
        }
      );
    } else {
      res.status(404).json("wrong credentials");
    }
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json("ok");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.json("token is not provided");
  }
  try {
    jwt.verify(token, process.env.SECRET, {}, (err, info) => {
      if (err) {
        console.log(err);
      }
      res.json(info);
    });
  } catch (error) {
    throw err;
  }
});

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.put("/post", upload.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);

    const isAuthor =
      JSON.stringify(postDoc.author._id) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const post = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(post);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  console.log(postDoc);
  res.json(postDoc);
});

app.listen(4000);
