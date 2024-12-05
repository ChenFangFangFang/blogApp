const bcrypt = require("bcrypt");
const User = require("../models/user_model");

const createUser = async (request, response) => {
  const { username, password } = request.body;
  try {
    const userToFind = await User.findOne({ username });
    if (!userToFind) {
      return response.status(401).json({
        error: "invalid username or password"
      });
    }
    if (!password || password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      url: 1,
      title: 1,
      likes: 1
    });
    response.status(200).json(users);
  } catch (error) {
    console.log("Error fetching user: ", error);
    response.status(500).json({ error: "Internal server error" });
  }
};
const getUserById = async (request, response) => {
  try {
    const { id } = request.params;

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return response.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(id).populate("blogs", {
      url: 1,
      title: 1,
      likes: 1
    });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json(user);
  } catch (error) {
    console.error("Error fetching blogs by user ID:", error);
    response.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
