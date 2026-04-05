import Scheme from "../models/Scheme.js";

export const addScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const toggleScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    scheme.isActive = !scheme.isActive;
    await scheme.save();
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllSchemesAdmin = async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.json({
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
