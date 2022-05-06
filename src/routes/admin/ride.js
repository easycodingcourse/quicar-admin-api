var express = require('express');
var router = express.Router();
const { getCompletedRideById } = require('../../controller/admin/rideController')
const { Op } = require("sequelize");

const RideList = require('../../models').ride_list
/* GET home page. */
router.get('/', getCompletedRideById);







// * update start_time_for_complete null fillup
// router.get('/demo', async (req, res, next) => {
//    const list =  await RideList.findAll({
//         attributes:["id","start_time","start_time_for_complete"],
//         where: {
//             payment_status: 1,
//             start_time_for_complete:{
//                 [Op.eq]:null
//             }
//         }
//     })

//     try {
//         list.forEach(element => {
//             RideList.update({
//                 start_time_for_complete:element.start_time
//             },{
//                 where:{
//                     id:element.id
//                 }
//             }).then(result=>{
//                 console.log(result);
//             })
//         });
//     } catch (error) {
//         console.log(error);
//     }
    
//     res.json({list,length:list.length})
// });






module.exports = router;