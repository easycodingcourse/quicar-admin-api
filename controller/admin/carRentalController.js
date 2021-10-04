const RideList = require('../../models').ride_list
const RideBiting = require('../../models').ride_biting
const City = require('../../models').city
const District = require('../../models').district
const CarTypes = require('../../models').car_types
const Users = require('../../models').users
const Owners = require('../../models').owners
const Cars = require('../../models').cars
const Drivers = require('../../models').drivers

const sequelize = require('../../models').sequelize
const { Op, fn, col } = require('sequelize')
const moment = require('moment')

const {getPaninationInfo, getPaninationPageInfo} = require('../../utils/utils')


const rideListInclude = {
    include: [
        {
            model: RideBiting,
            as:'ride_biding_list',
            include:[
                {
                    model:Owners,
                    as:'owner_info',
                    required: false,
                },
                {
                    model:Cars,
                    as:"car_info",
                    required: false,
                },
                {
                    model:Drivers,
                    as:'driver_info',
                    required: false,
                }
            ]
            
        },
        {
            model: Users,
            as: 'userInfo',
        },
        {
            model: City,
            as: 'startingCity',
        },
        {
            model: City,
            as: 'destinationCity',
        },
        {
            model: District,
            as: 'startingDistrict',
        },
        {
            model: District,
            as: 'destinationDistrict',
        },
        {
            model: CarTypes,
            as: 'carType',
        },
    ],
}


async function getPendingRide(req, res, next) {

    const pendingRide = await RideList.findAll({ ...rideListInclude, where: { status: 0 } })


    res.status(200).json({ pendingRide })
}



async function getWaitingForBid(req, res, next) {

    const waitingForBid = await RideList.findAll({

        ...rideListInclude,
        where: {
            status: 1,
            payment_status: 0,
            ride_visiable_time: {
                [Op.gt]: new Date()
            }
        }
    })


    res.status(200).json({ waitingForBid })
}



async function getUpcomingRide(req, res, next) {

    const upComingRide = await RideList.findAll({
        ...rideListInclude,
        where: {
            status: 4,
            payment_status: 1,
            start_time: {
                [Op.gt]: new Date()
            }

        }
    })


    res.status(200).json({ upComingRide })
}



async function getWaitingForDriver(req, res, next) {

    const waitingForDriver = await RideList.findAll({

        ...rideListInclude,
        where: {
            status: 4,
            payment_status: 1,
            start_time: {
                [Op.lt]: new Date()
            },
            start_time_for_complete: {
                [Op.gt]: new Date()
            }
        }
    })


    res.status(200).json({ waitingForDriver })
}


async function getCompletedRide(req, res, next) {

    let { page, limit, offset } = getPaninationInfo(req.query)


    const whereConfig = {
        where: {
            status:4,
            payment_status: 1,
            start_time_for_complete: {
                [Op.lt]: new Date()
            }
        }
    }


    const completedRide = await RideList.findAll({
        ...rideListInclude,
        ...whereConfig,
        order: [["id", "DESC"]],
        limit,
        offset,
    })


    const total = await RideList.count({...whereConfig})



    const mataInfo = getPaninationPageInfo({total,page,limit})

    




    res.status(200).json({mataInfo,completedRide})

}



async function getUnAcceptedRide(req, res, next) {

    const unAcceptedRide = await RideList.findAll({
        ...rideListInclude,
        where: {
            status: 4,
            payment_status: 1,
            start_time_for_complete: {
                [Op.lt]: new Date()
            }
        }
    })
    return unAcceptedRide;
}



async function getCanceledRide(req, res, next) {
    const canceledRide = await RideList.findAll({
        include: [
            {
                model: RideBiting
            },
            {
                model: Users,
                as: 'userInfo',
            },
            {
                model: City,
                as: 'startingCity',
            },
            {
                model: City,
                as: 'destinationCity',
            },
            {
                model: District,
                as: 'startingDistrict',
            },
            {
                model: District,
                as: 'destinationDistrict',
            },
            {
                model: CarTypes,
                as: 'carType',
            },
        ],
        where: {
            status: 4,
            payment_status: 1,
            start_time_for_complete: {
                [Op.lt]: new Date()
            }
        }
    })
    return canceledRide
}










module.exports = {
    getPendingRide,
    getWaitingForBid,
    getUpcomingRide,
    getWaitingForDriver,
    getCompletedRide,
    getUnAcceptedRide,
    getCanceledRide
}