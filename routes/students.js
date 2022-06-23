const express = require("express");
const router = express.Router();
var fs = require("fs"),
  parseString = require("xml2js").parseString,
  xml2js = require("xml2js");

let Student = require("../models/student");

router.get("/", (req, res) => {
  Student.find()
    .then((student) => {
      fs.readFile("students.xml", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          res.json({ data: student, xml: null });
        }
        if (data) {
          res.json({ data: student, xml: data });
        }
      });
    })
    .catch((err) => res.status(400).json("error" + err));
});

router.post("/add", (req, res) => {
  const newStudent = new Student({
    name: req.body.student.name[0],
    school: req.body.student.school[0],
    grade: req.body.student.grade[0],
    email: req.body.student.email[0],
  });

  newStudent
    .save()
    .then((addedStudent) => {
      fs.readFile("students.xml", "utf-8", function (err, data) {
        if (err) console.log(err);
        if (data) {
          parseString(data, function (err, result) {
            if (err) console.log(err);
            if (result) {
              var xmlDoc = result;

              xmlStudent = {
                $: { id: addedStudent._id },
                ...req.body.student,
              };

              xmlDoc.student_menu.student.push(xmlStudent);

              var builder = new xml2js.Builder();
              var xml = builder.buildObject(xmlDoc);

              fs.writeFile("students.xml", xml, function (err, data) {
                if (err) console.log(err);
              });
            }
          });
        }
      });

      res.json({ addedStudent, msg: "New Student added" });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
