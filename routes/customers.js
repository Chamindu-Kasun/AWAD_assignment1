const express = require('express')
const router = express.Router();
const axios = require('axios')

router.get("/", async (req, res) => {
  const customers = await axios.get('http://restapi.adequateshop.com/api/Customer')
  res.status(200).json({data: customers})
});


module.exports = router;