import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CryptoJs from "crypto-js";
import { check, validationResult, body, oneOf } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

/**
(NOTE)  Use case for express validator:
 check -> query, parameter,body
 body -> form data
 */

export const router = express.Router();

// register a new user
router.post(
  "/register",
  [
    check("username").not().isEmpty().withMessage("Invalid username"),
    // check('username','Invalid username').not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    check("password", "Use strong password").isStrongPassword(),
  ],
  async (req, res) => {
    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //get password and username
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists!",
        });
      }
      // password hashing
      const SECRET_KEY_HASH = parseInt(process.env.SECRET_KEY_HASH) || 10;
      const hashedPassword = await bcrypt.hash(password, SECRET_KEY_HASH);

      // new user create
      const user = {
        username,
        email,
        password: hashedPassword,
      };
      // save new user
      const savedUser = await User.create(user);
      // return  status to UI
      return res.status(201).json({
        message: "User registered successfully",
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: "Registration failed !",
      });
    }
  }
);

// login and generate JWT
router.post(
  "/login",
  [
    oneOf(
      [check("username").not().isEmpty(), check("email").isEmail()],
      "You must provide a valid email or valid username"
    ),
    check("password", "invalid password").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    // get username and passwor
    const { username, email, password } = req.body;

    // user find out based on username
    // const user = await User.findOne({username:username}) || await User.findOne({email:email});

    //**DYNAMIC QUERY */
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      return res.status(401).json({
        message: "user not found!!",
      });
    }
    // if user found then verify decrypted password
    const match = await bcrypt.compare(password, user.password);

    // if password mismatch send error message to ui
    if (!match) {
      return res.status(401).json({
        message: "password invalid",
      });
    }
    // if password matched then generate JWT token
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    /**
    const payload = {
        user:{
                id : user.id
            }
        }
     */

    //encrypt the JWT token

    const encryptedToken = CryptoJs.AES.encrypt(token, SECRET_KEY).toString();

    // if JWT token created successfully then it back to UI
    return res.json({ token: encryptedToken });
  }
);

/**
    Additional decrypt code 

    const SECRET_KEY = 'hidden'
    const encryptedToken = get from server

    const bytes = CryptoJs.AES.decrypt(encryptedToken, SECRET_KEY)
    const decryptedToken = bytes.toString(CryptoJs.enc.Utf8)
 */
