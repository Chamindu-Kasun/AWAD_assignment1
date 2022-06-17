const express = require('express')
const router = express.Router();
var fs = require("fs"),
  parseString = require("xml2js").parseString,
  xml2js = require("xml2js");

let Food = require("../models/food");

router.get("/", (req, res) => {
  Food.find()
    .then((food) => {
      fs.readFile("foods.xml", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          res.json({ data: food, xml: null });
        }
        if (data) {
          res.json({ data: food, xml: data });
        }
      });
    })
    .catch((err) => res.status(400).json("error" + err));
});

router.post("/add", (req, res) => {
  const newFood = new Food({
    name: req.body.food.name[0],
    price: req.body.food.price[0],
    description: req.body.food.description[0],
    calories: req.body.food.calories[0],
  });

  newFood
    .save()
    .then((addedFood) => {
      fs.readFile("foods.xml", "utf-8", function (err, data) {
        if (err) console.log(err);
        if (data) {
          parseString(data, function (err, result) {
            if (err) console.log(err);
            if (result) {
              var xmlDoc = result;

              xmlFood = {
                $: { id: addedFood._id },
                ...req.body.food,
              };

              xmlDoc.breakfast_menu.food.push(xmlFood);

              var builder = new xml2js.Builder();
              var xml = builder.buildObject(xmlDoc);

              fs.writeFile("foods.xml", xml, function (err, data) {
                if (err) console.log(err);
              });
            }
          });
        }
      });

      res.json({ addedFood, msg: "New Food added" });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
