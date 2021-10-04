const Ride_list = require('../../models/index').ride_list
const { Op } = require("sequelize");



async function getCompletedRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            payment_status: 1,
            user_id: id,
            start_time_for_complete: {
                [Op.lt]: new Date()
            }
        },

        order: [
            ['id', 'DESC']
        ],
        limit: 50
    })

    res.status(200).json(data)
}


async function getAcceptedRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            status: 4,
            payment_status: 1,
            user_id: id,
            start_time_for_complete: {
                [Op.gt]: new Date()
            }
        },

        order: [
            ['id', 'DESC']
        ],
        limit: 50
    })

    res.status(200).json(data)
}



async function getCancelRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            status: 2,
            user_id: id
        },

        order: [
            ['id', 'DESC']
        ],
    })

    res.status(200).json(data)
}


async function getPendingRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            status: 0,
            user_id: id
        },

        order: [
            ['id', 'DESC']
        ],
    })

    res.status(200).json(data)
}




async function getUnAcceptedRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            status: 1,
            payment_status: 0,
            start_time: {
                [Op.lt]: new Date()
            }
        },

        order: [
            ['id', 'DESC']
        ],
    })

    res.status(200).json(data)
}



async function getWaitingForAcceptedRideById(req, res, next) {
    const { id } = req.query
    const data = await Ride_list.findAll({
        where: {
            status: 1,
            payment_status: 0,
            start_time: {
                [Op.gt]: new Date()
            }
        },

        order: [
            ['id', 'DESC']
        ],
    })

    res.status(200).json(data)
}















module.exports = {
    getCompletedRideById,
}