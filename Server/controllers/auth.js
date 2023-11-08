import User from "../models/User.js";

export const register = async (req, res) => {
  const { wallet, username } = req.body;

  try {
    const user = await User.create({ wallet, username });
    return res.json({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Username or wallet already exists",
      });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  const { wallet } = req.params;

  try {
    const user = await User.findOne({ wallet });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
