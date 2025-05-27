import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

//authMiddleWare for JWT token validation for protecting routes and resources (i.e. tasks)

export function authMiddleWare(req, res, next) {
  // console.log(req);
  console.log("==================================");
  console.log("req.header");
  console.log(req.header("x-auth-token"));

  //get jwt auth token
  const token =
    req.header("x-auth-token") || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  //validate jwt token
  try {
    //extra cryptoJs Decryption (custom)
    const SECRET_KEY = process.env.SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    //jwt part : verify token
    const decodedPayload = jwt.verify(decryptedToken, SECRET_KEY);
    console.log(decodedPayload);
    console.log("----end-of-miidleware--");

    req.user = decodedPayload;
    console.log("Middleware: User   " + req.user);
    console.log("Middleware: User id  " + req.user._id);
    console.log("=================================");

    next();
    console.log("=============================== next");
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
}
