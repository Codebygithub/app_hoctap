const jwt  = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
//get list user function
async function getListUser(req,res) {
    //get Token
    const bearerHeaders = req.headers['authorization']
    const accessToken = bearerHeaders.split(' ')[1]
    //verify
    try {
        const decodejwt = jwt.verify(accessToken,process.env.SECRECT_JWT)
        if(decodejwt){
            const Users = await UserModel.find();
            res.status(200).send(Users)

        }
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).send('Token Expired')

        }
        
    }
}
// post user function

    
module.exports= {
    getListUser:getListUser,
}