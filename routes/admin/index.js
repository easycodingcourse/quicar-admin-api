var express = require('express');
const { checkToken } = require('../../auth/checkToken');
const { adminLogin } = require('../../controller/admin/adminController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to admin api . Contact to Support ' });
});




router.use("/user",checkToken,require('./user'))
router.post("/login",adminLogin)
router.use("/ride",require('./ride'))
router.use("/car-rental",require('./carRental'))



module.exports = router;
