const { verify } = require("jsonwebtoken");
const { secrate_key } = require("../utils/constantValue");
const Adminlists = require('../models').adminlists
module.exports = {
    checkToken: async (req, res, next) => {
        let token = req.get("authorization");
        if (!token) {
            return res.status(200).json({ status: false, message: "Access denied! unauthorized user",tokenError:true })
            // return res.status(401).json({status:false,message:"Access denied! unauthorized user"})
        }
        token = token.slice(7);

        try {
            var decoded = verify(token, secrate_key);
            if(!decoded.id){
                return res.status(200).json({ status: false, message: "Invalid token",tokenError:true})
            }
            req.accessId = decoded.id

            const admin = await Adminlists.findOne({where:{id:decoded.id}}).catch(error=>console.log(error))

            const tokenList = JSON.parse(admin.jwt)

            if(!tokenList.includes(token)){
                return res.status(200).json({ status: false, message: "Invalid token",tokenError:true})
            }


            next()

        } catch (err) {
            return res.status(200).json({ status: false, message: "Invalid token",tokenError:true })
        }
       
    },
};
