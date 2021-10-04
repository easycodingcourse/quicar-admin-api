const Adminlists = require('../../models').adminlists
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const {secrate_key}  = require('../../utils/constantValue')

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body

    const result = await Adminlists.findOne({

        attributes:{
            exclude:["deleted_at","updated_at","created_at"]
        },
        where: {
            email: email 
        }
    })

    if(!result){
        return res.json({status:false,message:"admin not found. Contact to support"})
    }

    

    const matchPassword = bcrypt.compareSync(password, result.password);


    if(!matchPassword){
        return res.json({status:false,message:"password Not match."})
    }


    const data = {
        id: result.id,
        name:result.name,
    }

    const jsontoken = jwt.sign(data, secrate_key, {});


    let tokenList = [];
    let tokenNeed = 2;
    if(result.jwt!==null){
        tokenList = JSON.parse(result.jwt);
        if(tokenList.length>=tokenNeed){
            tokenList.splice(0, (tokenList.length-(tokenNeed-1)));
        }
    }
    tokenList.push(jsontoken)
    const storeTokenString = JSON.stringify(tokenList)

    const resultUpdate = await Adminlists.update({jwt:storeTokenString},{
        where:{
            id:result.id
        }
    })



    const adminInfo = {
        name:result.name,
        email:result.email,
        profile:result.profile,
        phone:result.phone,
        type:result.type,
        accessList:result.accessList,
    }


    res.json({status:true,admin:adminInfo,accessToken:jsontoken,message:"successfully login"})

}







module.exports = {
    adminLogin
}

