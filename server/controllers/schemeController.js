import Scheme from "../models/Scheme.js";
import User from "../models/User.js";

export const getMatchedSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.profile || !user.profile.age) {
      return res.status(400).json({
        message: "Please compl+ete your profile first",
      });
    }

    const {
      age,
      gender,
      state,
      annualIncome,
      caste,
      isStudent,
      isFarmer,
      isWomen,
    } = user.profile;

    let query = {
      isActive: true,
      "eligibility.minAge": { $lte: age },
      "eligibility.maxAge": { $gte: age },
      "eligibility.maxAnnualIncome": { $gte: annualIncome || 0 },
    };

    if (gender && gender !== "any") {
      query["eligibility.gender"] = { $in: [gender, "any"] };
    }

    if (caste) {
      query["eligibility.casteRequired"] = {
        $in: [caste, "all"],
      };
    }

    if (state) {
      query["eligibility.states"] = {
        $in: [state, "all"],
      };
    }
    if (!isStudent) {
      query["eligibility.isStudentRequired"] = false;
    }
    if (!isFarmer) {
      query["eligibility.isFarmerRequired"] = false;
    }
    if (!isWomen) {
      query["eligibility.isWomenRequired"] = false;
    }

    const schemes = await Scheme.find(query);

    res.json({
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSchemes = async (req, res) => {
  try {
    const { category, state, search } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }
    if (state) {
      query["eligibility.states"] = { $in: [state, "all"] };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const schemes = await Scheme.find(query);
    res.json({
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
