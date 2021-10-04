const Users = require('../../models/index').users
const { Op } = require("sequelize");

const Ride_list = require('../../models').ride_list

const getUserList = async (req, res, next) => {
  const { page, limitData = 5, searchOptionFilter } = req.query;

  var whereConfig = {}
  const filter = JSON.parse(searchOptionFilter)


  console.log("query", filter);



  if (filter.number) {
    if (filter.number !== '') {
      whereConfig = {
        ...whereConfig,
        phone: {
          [Op.like]: `%${filter.number}%`
        }
      }
    }
  }

  if (filter.name) {
    if (filter.name !== '') {
      whereConfig = {
        ...whereConfig,
        name: {
          [Op.like]: `%${filter.name}%`
        }
      }
    }
  }

  if (filter.email) {
    if (filter.email !== '') {
      whereConfig = {
        ...whereConfig,
        email: {
          [Op.like]: `%${filter.email}%`
        }
      }
    }
  }









    let limit = parseInt(limitData);
    let pageNumber = parseInt(page);
    pageNumber === 0 ? (pageNumber = 1) : null;
    let offset = parseInt((pageNumber - 1) * parseInt(limit));


  // balance:{
  //   [Op.gt]: 500
  // }

  const config = {
    where: {
      account_status: 1,
      ...whereConfig

    },
    order: [["id", "DESC"]],
    limit,
    offset,
  };


  const result = await Users.findAndCountAll({
    ...config,
  }).catch((error) => console.log(error));





  const total = result.count;
  const userList = result.rows;
  let totalPage = Math.ceil(total / limit);
  var hasNextPage = true;
  let nextPage = pageNumber + 1;
  nextPage > totalPage ? hasNextPage = false : null



  const totalUser = await Users.count()

  const data = {
    status: true,
    message: "",
    totalUser,
    total,
    nextPage,
    hasNextPage,
    limit,
    userList

  }

  res.json(data)
}


async function getUserInfo(req, res, next) {
  const { id } = req.query
  const user = await Users.findByPk(id).catch(error => console.log(error))


  const totalRide = await Ride_list.count({ where: { user_id: id } })
  const cancelRide = await Ride_list.count({ where: { user_id: id,status:2 } })
  const pendingRide = await Ride_list.count({ where: { user_id: id, status: 0 } })

  const waitingForBid = await Ride_list.count({
    where: {
      user_id: id,
      status: 1,
      payment_status: 0,
      start_time: {
        [Op.gt]: new Date()
      }
    }
  })


  const unAcceptedRide = await Ride_list.count({
    where: {
      user_id: id,
      status: 1,
      payment_status: 0,
      start_time: {
        [Op.lt]: new Date()
      }
    }
  })


  const upComingRide = await Ride_list.count({
    where: {
      user_id: id,
      status: 4,
      payment_status: 1,
      start_time: {
        [Op.gt]: new Date()
      }

    }
  })



  const waitingForDriver = await Ride_list.count({
    where: {
      user_id: id,
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


  const completedRide = await Ride_list.count({
    where: {
      user_id: id,
      status: 4,
      payment_status: 1,
      start_time_for_complete: {
        [Op.lt]: new Date()
      }
    }
  })



  const carRental = {
    totalRide,
    pendingRide,
    waitingForBid,
    upComingRide,
    unAcceptedRide,
    waitingForDriver,
    completedRide,
    cancelRide
  }



  res.status(200).json({ user, carRental })
}


module.exports = {
  getUserList,
  getUserInfo
}