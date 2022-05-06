var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

const { getCarRentalSummery } = require('../../controller/admin/carRentalSummaryController');
const { getPendingRide, getWaitingForBid,getUpcomingRide,getWaitingForDriver,getCompletedRide,getUnAcceptedRide,getCanceledRide } = require('../../controller/admin/carRentalController');
/* GET home page. */
router.get('/', (req,res,next)=>{

    res.json({path:"car-rental"})

});

router.get('/summary',getCarRentalSummery);
router.get('/pending',getPendingRide);
router.get('/waitingforbid',getWaitingForBid);
router.get('/upComingRide',getUpcomingRide);
router.get('/waitingForDriver',getWaitingForDriver);
router.get('/completedRide',getCompletedRide);
router.get('/unAcceptedRide',getUnAcceptedRide);
router.get('/canceledRide',getCanceledRide);





module.exports = router;