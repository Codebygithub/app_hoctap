const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async (req,res) => {
   try {
    const {username, email, password} = req.body
    await UserModel.create({
        username:username,
        password:bcrypt.hashSync(password,10),
        email:email,
        role:'regular',
    })
    return res.status(200).send('register user')
   } catch (error) {
    console.log('error: ' + error);
    
   }
};
const login = async (req,res)=> {
    const user = await UserModel.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('invalid email');
    }
    const isPassword = bcrypt.compareSync(req.body.password,user.password)
    if(!isPassword) {
        return res.status(400).send('invalid password');
    }
    const jwtToken = jwt.sign({
        _id:user.id,
        username:user.username,
        role:user.role
    },process.env.SECRECT_JWT,{
        expiresIn:3600
    })

    res.status(200).send({
        accessToken: jwtToken
    });
    
}
const createUser = async (req,res)=> {
    //get Token
    const bearerHeaders = req.headers['authorization']
    const accessToken = bearerHeaders.split(' ')[1]
    //verify
    try {
        const decodejwt = jwt.verify(accessToken,process.env.SECRECT_JWT)
        if(decodejwt && decodejwt.username == 'admin13'){
            await UserModel.create({
                username:username,
                password:bcrypt.hashSync(password,10),
                email:email
            })
            res.status(200).send('success data')

        }
    } catch (error) {

        
    }
}
module.exports = {
    register:register,
    login:login,
    createUser:createUser
    
}