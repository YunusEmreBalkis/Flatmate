const Activity = require("../models/Activity");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const createActivity = async (req, res) => {
  req.body.author = req.user.userId;

  const activity = await Activity.create(req.body);

  res.status(StatusCodes.CREATED).json({ activity });
};

const getAllActivities = async (req, res) => {
  const activities = await Activity.find({});

  res.status(StatusCodes.OK).json({ activities });
};

const getSingleActivity = async (req, res) => {
  const { id: activityId } = req.params;

  const activity = await Activity.findOne({ _id: activityId });

  res.status(StatusCodes.OK).json({ activity });
};

const updateActivity = async (req, res) => {
  const { id: activityId } = req.params;

  const activity = await Activity.findOne({_id:activityId});

  checkPermissions(req.user,activity.author)

   await Activity.findByIdAndUpdate(
    { _id: activityId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!activity) {
    throw new CustomError.NotFoundError(
      `No activity with that id : ${activityId}`
    );
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Activity updated." });
};

const deleteActivity = async (req, res) => {
  const { id: activityId } = req.params;

  const activity = await Activity.findOne({ _id: activityId });

  if (!activity) {
    throw new CustomError.NotFoundError(
      `No activity with that id : ${activityId}`
    );
  }
  checkPermissions(req.user,activity.author)
  await activity.remove();
  res.status(StatusCodes.OK).json({ msg: "Succes! Activity removed" });
};

const joinActivity = async (req, res) => {
  const user = req.user.userId;

  const { id: activityId } = req.params;

  const activity = await Activity.findOne({ _id: activityId });

  activity.whoAttend.push(user);

  activity.save();

  res.status(StatusCodes.OK).json({ activity });
};

module.exports = {
  createActivity,
  getAllActivities,
  getSingleActivity,
  updateActivity,
  deleteActivity,
  joinActivity
};
