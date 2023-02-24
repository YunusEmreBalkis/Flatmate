const Dormitory = require("../models/Dormitory");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createDormitory = async (req, res) => {
  req.body.executive = req.user.userId;
  const dormitory = await Dormitory.create(req.body);

  res.status(StatusCodes.CREATED).json({ dormitory });
};

const getallDormitories = async (req, res) => {
  if (req.user.role != "admin") {
    throw new CustomError.UnauthorizedError(
      "You dont have to permission this route"
    );
  }

  const dormitories = await Dormitory.find({});

  res.status(StatusCodes.OK).json({ dormitories,count:dormitories.length });
};

const getDormitoryById = async (req, res) => {
  const { id: dormitoryId } = req.params;

  const dormitory = await Dormitory.findOne({ _id: dormitoryId });

  res.status(StatusCodes.OK).json({ dormitory });
};

const updateDormitory = async (req, res) => {
  const { id: dormitoryId } = req.params;

  const dormitory = await Dormitory.findByIdAndUpdate(
    { _id: dormitoryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ dormitory });
};

const deleteDormitory = async (req, res) => {
  const { id: dormitoryId } = req.params;

  const dormitory = await Dormitory.findOne({ _id: dormitoryId });

  if (!dormitory) {
    throw new CustomError.NotFoundError(`No dormitory with that id : ${dormitoryId}`);
  }

  dormitory.remove();

  res.status(StatusCodes.OK).json({ msg: "Succes! Dormitory removed" });
};

module.exports = {
  createDormitory,
  updateDormitory,
  deleteDormitory,
  getallDormitories,
  getDormitoryById,
};
