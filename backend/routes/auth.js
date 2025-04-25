import express, { json } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';




export const router = express.Router();


   // register a new user
router.post('/register', async(req, res)=> {

    //get password and username
    const {username ,  password} = req.body;  

    if( !username || !password){
        return res.status(400).json({
            message : 'Username or Password invalid'
        })
    }

    // password hashing
    try{
        const secretKey = 10;
        const hashedPassword = await bcrypt.hash(password , secretKey)

        // new user create 
        const user = {
            username,
            password : hashedPassword,
        }
        // save new user
        const savedUser = await User.create(user)
        // return  status to UI
        return res.status(201).json({
            message : 'User registered successfully'
        })
    }
    catch(err){
        console.error(err);
        
        return res.status(500).json({
            message : 'Registration failed !'
        })
    }
 });





// login and generate JWT 
router.post('/login', async(req, res)=> {

        // get username and password
        const {username , password} = req.body; 

        // user find out based on username
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(401).json({
                message : "user not found!!"
            })
        }
        // if user found then verify decrypted password 
        const match = await bcrypt.compare(password , user.password)

        // if password mismatch send error message to ui
        if(!match){
            return res.status(401).json({
                message : "password invalid"
            })
        }
        // if password matched then generate JWT token 
        const token = jwt.sign({_id : user._id}, 'hidden')
        // if JWT token created successfully then it back to UI
        return res.json({token})
});
