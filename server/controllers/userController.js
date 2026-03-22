import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profile: req.body },
      { new: true },
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveScheme = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { savedSchemes: req.params.schemeId } },
      { new: true },
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedSchemes")
      .select("-password");

    res.json(user.savedSchemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
