const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FoodSchema = new Schema(
  {
    name: {
      type: String, 
      required: true, 
    },
    price: {
      type: String, 
      required: true,
    },
    description: {
      type: String, 
      required: true, 
    },
    calories: {
      type: Number, 
      required: true, 
    }
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
