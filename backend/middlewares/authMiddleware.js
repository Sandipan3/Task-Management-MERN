import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

//authMiddleWare for JWT token validation for protecting routes and resources (i.e. tasks)

export function authMiddleWare(req,res,next){

    //get jwt auth token
    const token = req.header('x-auth-token') ||
                  req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    //validate jwt token
    try {
        //extra cryptoJs Ddecryption
        const secretKey = 'hidden'
        const bytes = CryptoJS.AES.decrypt(token, secretKey)
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

        //jwt part : verify token
        const decodedPayload = jwt.verify(decryptedToken,secretKey) 
        console.log(decodedPayload);
        next();

    } catch (error) {

        console.log(error);
        return res.status(403).json({
             message : "Unauthorized"
        })
        
    }
}