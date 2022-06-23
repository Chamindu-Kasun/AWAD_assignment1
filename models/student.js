const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
