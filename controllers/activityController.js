const Activity = require("../models/Activity");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions,assetCheck } = require("../utils");

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
  assetCheck(activity,activityId,"activity");

  res.status(StatusCodes.OK).json({ activity });
};

const updateActivity = async (req, res) => {
  const { id: activityId } = req.params;

  const activity = await Activity.findOne({_id:activityId});

  assetCheck(activity,activityId,"activity");

  checkPermissions(req.user,activity.author)

   await Activity.findByIdAndUpdate(
    { _id: activityId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  
  res.status(StatusCodes.OK).json({ msg: "Success! Activity updated." });
};

const deleteActivity = async (req, res) => {
  const { id: activityId } = req.params;

  const activity = await Activity.findOne({ _id: activityId });

  assetCheck(activity,activityId,"activity");
  checkPermissions(req.user,activity.author)
  await activity.remove();
  res.status(StatusCodes.OK).json({ msg: "Succes! Activity removed" });
};

const joinActivity = async (req, res) => {
  const user = req.user.userId;

  const { id: activityId } = req.params;

  const activity = await Activity.findOne({ _id: activityId });

  assetCheck(activity,activityId,"activity");

  if (activity.whoAttend.includes(user)) {
    activity.whoAttend.splice(activity.whoAttend.indexOf(user),1)
  }
  else{
    activity.whoAttend.push(user);
  }


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
