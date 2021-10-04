const Ride_list = require('../../models').ride_list
const sequelize = require('../../models').sequelize
const { Op, fn, col } = require('sequelize')
const moment = require('moment')

var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

async function getCarRentalSummery(req, res, next) {

    const totalCarRentalStatistics = await getTotalCarRentalStatistics()

    const currentMonthCarRentalStatistics = await getCurrentMonthCarRentalStatistics()



    const fullYearlyCarRentalStatictics = await getFullYearlyCarRentalStatictics()
    const barChatDatasetForYearly = await getBarChatDatasetForYearly()


    // const firstDateofYear = `${moment().format('YYYY')}-January-01 00:00:00`

    // const ff = moment(firstDateofYear).format('YYYY-MM-DD HH:mm:ss')

    // const lastDateofYear = `${moment().format('YYYY')}-12-01 23:59:59`



    res.status(200).json({ totalCarRentalStatistics, currentMonthCarRentalStatistics, fullYearlyCarRentalStatictics, barChatDatasetForYearly })
}


async function getCurrentMonthCarRentalStatistics() {
    const currentMonthStatistics = {
        total: await getCurrentMonthTotalRide(),
        completed: await getCurrentMonthCompletedRide(),
        upComing: await getCurrentMonthUpComingRide(),
        canceled: await getCurrentMonthCanceledRide(),
        unAccepted: await getCurrentMonthUnAcceptedRide(),
    }
    return currentMonthStatistics
}

async function getTotalCarRentalStatistics() {

    const totalRide = await Ride_list.count()
    const cancelRide = await Ride_list.count({ where: { status: 2 } })
    const pendingRide = await Ride_list.count({ where: { status: 0 } })

    const waitingForBid = await Ride_list.count({
        where: {
            status: 1,
            payment_status: 0,
            ride_visiable_time: {
                [Op.gt]: new Date()
            }
        }
    })


    const unAcceptedRide = await Ride_list.count({
        where: {
            status: 1,
            payment_status: 0,
            ride_visiable_time: {
                [Op.lt]: new Date()
            }
        }
    })


    const upComingRide = await Ride_list.count({
        where: {
            status: 4,
            payment_status: 1,
            start_time: {
                [Op.gt]: new Date()
            }

        }
    })



    const waitingForDriver = await Ride_list.count({
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


    const completedRide = await Ride_list.count({
        where: {
            status: 4,
            payment_status: 1,
            start_time_for_complete: {
                [Op.lt]: new Date()
            }
        }
    })

    const totalCarRentalStatistics = {
        totalRide,
        pendingRide,
        waitingForBid,
        upComingRide,
        unAcceptedRide,
        waitingForDriver,
        completedRide,
        cancelRide
    }

    return totalCarRentalStatistics;

}

async function getCurrentMonthCompletedRide() {
    const result = await Ride_list.count({
        where: {
            status: 4,
            payment_status: 1,
            start_time_for_complete: {
                [Op.lt]: new Date()
            },
            created_at: {
                [Op.between]: [moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
            }

        }
    })
    return result;
}

async function getCurrentMonthUpComingRide() {
    const result = await Ride_list.count({
        where: {
            status: 4,
            payment_status: 1,
            start_time: {
                [Op.gt]: new Date()
            },
            start_time_for_complete: {
                [Op.lt]: new Date()
            },
            created_at: {
                [Op.between]: [moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
            }

        }
    })
    return result;
}

async function getCurrentMonthTotalRide() {
    const result = await Ride_list.count({
        where: {
            created_at: {
                [Op.between]: [moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
            }
        }
    })
    return result;
}
async function getCurrentMonthCanceledRide() {
    const result = await Ride_list.count({
        where: {
            status: 2,
            created_at: {
                [Op.between]: [moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
            }
        }
    })
    return result;
}
async function getCurrentMonthUnAcceptedRide() {
    const result = await Ride_list.count({
        where: {
            status: 1,
            payment_status: 0,
            ride_visiable_time: {
                [Op.lt]: new Date()
            },
            created_at: {
                [Op.between]: [moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
            }
        }
    })
    return result;
}

async function getFullYearlyCarRentalStatictics() {
    const data = []
    const currentMonth = moment().format('MMMM')
    for (let index = 0; index < monthList.length; index++) {
        const month = monthList[index];

        const monthlyFirstDate = moment(`${moment().format('YYYY')}-${month}-01 00:00:00`).clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const monthlyLastDate = moment(`${moment().format('YYYY')}-${month}-01 00:00:00`).clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');

        const result = await Ride_list.count({
            where: {
                status: 4,
                payment_status: 1,
                start_time_for_complete: {
                    [Op.lt]: new Date()
                },
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }

            }
        })


        const totalRide = await Ride_list.count({
            where: {
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })



        const totalCancel = await Ride_list.count({
            where: {
                status: 2,
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })

        const unAccepted = await Ride_list.count({
            where: {
                status: 1,
                payment_status: 0,
                ride_visiable_time: {
                    [Op.lt]: new Date()
                },
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })

        data.push({
            monthlyFirstDate,
            monthlyLastDate,
            month: month, 
            total: totalRide, 
            completed: result, 
            totalCancel, 
            totalUnAccepted: unAccepted 
        })

        if (currentMonth === month) {
            break
        }
    }


    return data

}

async function getBarChatDatasetForYearly() {
    var data = {
        completed: [],
        unAccepted: [],
        canceled: []
    }

    for (let index = 0; index < monthList.length; index++) {
        const month = monthList[index];

        const monthlyFirstDate = moment(`${moment().format('YYYY')}-${month}-01 00:00:00`).clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const monthlyLastDate = moment(`${moment().format('YYYY')}-${month}-01 00:00:00`).clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');



        const totalCompleted = await Ride_list.count({
            where: {
                status: 4,
                payment_status: 1,
                start_time_for_complete: {
                    [Op.lt]: new Date()
                },
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }

            }
        })


        const totalRide = await Ride_list.count({
            where: {
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })



        const totalCancel = await Ride_list.count({
            where: {
                status: 2,
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })

        const unAccepted = await Ride_list.count({
            where: {
                status: 1,
                payment_status: 0,
                ride_visiable_time: {
                    [Op.lt]: new Date()
                },
                created_at: {
                    [Op.between]: [monthlyFirstDate, monthlyLastDate],
                }
            }
        })

        data.completed.push(totalCompleted)
        data.canceled.push(totalCancel)
        data.unAccepted.push(unAccepted)

    }


    return data

}





module.exports = {
    getCarRentalSummery
}