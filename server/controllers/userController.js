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
    const user = await User.findById(req.user._id);

    const alreadySaved = user.savedSchemes.find(
      (item) => item.scheme.toString() === req.params.schemeId,
    );

    if (alreadySaved) {
      return res.status(400).json({ message: "Scheme already saved" });
    }
    user.savedSchemes.push({
      scheme: req.params.schemeId,
      status: "saved",
      savedAt: Date.now(),
    });

    await user.save();
    res.json({ message: "Scheme saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSchemeStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const savedScheme = user.savedSchemes.find(
      (item) => item.scheme.toString() === req.params.schemeId,
    );

    if (!savedScheme) {
      return res
        .status(404)
        .json({ message: "Scheme not found in saved list" });
    }
    savedScheme.status = req.body.status;

    if (req.body.status === "applied") {
      savedScheme.appliedAt = Date.now();
    }
    if (req.body.notes) {
      savedScheme.notes = req.body.notes;
    }

    await user.save();
    res.json({ message: "Status updated successfully" });
  } catch (error) {}
};

export const getSavedSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedSchemes.scheme")
      .select("-password");

    res.json(user.savedSchemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
