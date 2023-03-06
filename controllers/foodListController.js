const FoodList = require("../models/FoodList");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions, assetCheck } = require("../utils");

const getAllFoodList = async (req, res) => {
  const foodlists = await FoodList.find({});

  res.status(StatusCodes.OK).json({ foodlists });
};

const getSingleFoodList = async (req, res) => {
  const { id: foodlistId } = req.params;

  const foodlist = await FoodList.findById({ _id: foodlistId });

  res.status(StatusCodes.OK).json({ foodlist });
};

const createFoodList = async (req, res) => {
  req.body.author = req.user.userId;

  const foodlist = await FoodList.create(req.body);

  res.status(StatusCodes.CREATED).json({ foodlist });
};
const updateFoodList = async (req, res) => {
  const { id: foodlistId } = req.params;

  const foodlist = await FoodList.findById({ _id: foodlistId });
  assetCheck(foodlist, foodlistId, "foodlist");
  checkPermissions(req.user, foodlist.author);

  await FoodList.findByIdAndUpdate({ _id: foodlistId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Success! FoodList updated." });
};
const deleteFoodList = async (req, res) => {
  const { id: foodlistId } = req.params;

  const foodlist = await FoodList.findById({ _id: foodlistId });
  assetCheck(foodlist, foodlistId, "foodlist");
  checkPermissions(req.user, foodlist.author);

  await foodlist.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! FoodList deleted." });
};

module.exports = {
  getAllFoodList,
  getSingleFoodList,
  createFoodList,
  updateFoodList,
  deleteFoodList,
};
