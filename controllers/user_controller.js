const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user_model");
const { response } = require("express");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

//get all users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    likes: 1
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate("blogs", {
      url: 1,
      title: 1,
      likes: 1
    });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json(user.blogs);
  } catch (error) {
    console.error("Error fetching blogs by user ID:", error);
    response.status(500).json({ error: "Something went wrong" });
  }
});
module.exports = usersRouter;