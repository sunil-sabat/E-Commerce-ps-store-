import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

// @desc      Auth user & get token
// @route     GET /api/users/login
// @access    public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized

    throw new Error("Invalid email or password");
  }
});

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404); // Not found
    throw new Error("User not found");
  }
});

// @desc      update profile
// @route     PUT /api/users/profile
// @access    private

const userUpdateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc      Register a new user
// @route     POST /api/users/profile
// @access    public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exits");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    // 201-successfully created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Bad request
    throw new Error("Inavalid user data");
  }
});

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ messsage: "user deleted successfully" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc      Get User By Id
// @route     GET /api/users/:id
// @access    Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status("404");
    throw new Error("User not Found");
  }
});

// @desc      Update User
// @route     PUT /api/users/:id
// @access    Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});

export {
  authUser,
  getUserProfile,
  getUserById,
  registerUser,
  userUpdateProfile,
  getUsers,
  deleteUser,
  updateUser,
};
