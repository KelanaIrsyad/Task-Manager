const { UserModel } = require('./user.model')
const bcrypt = require('bcrypt');
const { ValidatePassword, GenerateToken } = require('./user.service');

async function CreateUser(req, res){
    try{
        const existingEmail = await UserModel.findOne({ email: req.body.email })
        if(existingEmail){
            return res.status(400).json({ message: "Email already exists" });
        }
        const existingUsername = await UserModel.findOne({ username: req.body.username })
        if(existingUsername){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await UserModel.create({
            ...req.body,
            password: hashedPassword
        })
        const { password, ...user} = req.body
        return res.status(201).json({ message: "User created", user })
    } catch(err){
        console.log(err)
        return res.status(400).json({ message: "Error creating user" })
    }
}

async function LoginUser(req, res){
    try{
        const user = await UserModel.findOne({ email: req.body.email})
        if(!user){
            return res.status(401).json({ message: "User not found" })
        }
        const isPasswordValid = await ValidatePassword(req.body.password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" })
        }
        const payload = {
            userId : user._id,
            email : user.email,
            username : user.username
        }
        const token = await GenerateToken(payload)
        return res.status(200).json({ message: "Login success", token })
    } catch(err){
        console.log(err)
        return res.status(400).json({ message: "Error logging in" })
    }
}

module.exports = {
    CreateUser,
    LoginUser
}