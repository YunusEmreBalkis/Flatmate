const mongoose = require("mongoose");

const FoodListSchema = new mongoose.Schema(
  {
    foods: [
      {
        content: {
          type: String,
          required: [true, "Please provide a content"],
          minlength: 3,
          maxlength: 20,
        },
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caneateveryone: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodList", FoodListSchema);
