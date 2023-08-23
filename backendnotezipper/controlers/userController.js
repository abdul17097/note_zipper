const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const generteToken = require('../utils/generateTokes');
const registerUser = async (req,res)=>{
    const {name, email, password, confirmPassword, imageUrl}  = req.body;
    const userExit = await User.findOne({email});
    try {
        if(userExit){
            res.status(409);
            res.json({
                message: "User already Exist"
            })
        }
    
        const user = await User.create({
            name, email, password, confirmPassword, imageUrl,
        })
        
    
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                isAdmin: user.isAdmin,
                imageUrl: user.imageUrl
            });
        }
    } catch (error) {
        res.status(400)
    }
  
}

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user || !await bcrypt.compare(password,user.password)){
            res.status(401).send("Invalid Credentials")
        }else{
            res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        imageUrl: user.imageUrl,
                        token: generteToken(user._id)
                    })
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

const updateUser = async (req, res)=>{
    const user = await User.findOne({_id:req.userId});
    const {name, email, password, confirmPassword, imageUrl}  = req.body;
    try {
        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
            user.confirmPassword = confirmPassword || user.confirmPassword
            user.imageUrl = imageUrl || user.imageUrl
    
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                imageUrl: updatedUser.imageUrl,
                token: generteToken(user._id)
            });
        }else{
            res.status(401).json({success: false});
        }
    } catch (error) {
        res.status(401).json({success: false});
    }
    
}


module.exports = {registerUser, loginUser, updateUser};