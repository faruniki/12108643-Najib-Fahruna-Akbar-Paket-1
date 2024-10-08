const Review = require("../models/review.model");

const reviewController = {};

reviewController.create = async (req, res) => {
  try {
    const review = await Review.create(req.body)
      .populate("userId")
      .populate("bukuId");
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

reviewController.findAll = async (req, res) => {
  try {
    // const userId = req.user._id?.toHexString();
    // const query = { userId: userId };
    const review = await Review.find()
      .populate("userId")
      .populate("bukuId");
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

reviewController.findById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id, req.body);
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

reviewController.delete = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("review deleted");
  } catch (error) {
    res.status(400).send(error);
  }
};

reviewController.update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = reviewController;
