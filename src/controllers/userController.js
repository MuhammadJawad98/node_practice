const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user = require('../model/user');
const SECRET_KEY = 'NOTESAPI';
const signup = async (req,res)=>{

const { username, email, password } = req.body;
try{
const existUser = await userModel.findOne({email:email});
if(existUser){
return res.status(400).json({message:'User already exist'});
}
const hashPassword = await bcrypt.hash(password,10);
const result = await userModel.create({
    email: email,
    password:hashPassword,
    username:username
});

const token = jwt.sign({email:email,id:result._id},SECRET_KEY);
res.status(200).json({
user:result,
token:token

});

}catch(e){
console.log(e);
res.status(500).json({messgae:'Somthing went wrong'});
}

};

const signin = async (req,res)=>{
    const {email, password } = req.body;
    try{
    const existUser = await userModel.findOne({email:email});
    if(!existUser){
    return res.status(404).json({message:'User not found'});
    }
const matchPassword = await bcrypt.compare(password,existUser.password);

if(!matchPassword){
    return res.status(400).json({message:'Invalid Credentials'});
}
const token = jwt.sign({email:existUser.email,id:existUser._id},SECRET_KEY);
res.status(200).json({
    user:existUser,
    token:token
    
    });


}catch(e){
    console.log(e);
    res.status(500).json({messgae:'Somthing went wrong'});
    }
};

module.exports = {
    signup,
    signin
}