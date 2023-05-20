import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const isCustomAuth = token?.length < 500;
      let decodedData;
      if (token && isCustomAuth){
     
        decodedData =await jwt.verify(token, 'test2');
          req.user=decodedData
          next();
        } else {
          decodedData = jwt.decode(token);
          console.log('middle,',decodedData)
        next();
      }
    } else {
      console.log(token)
      res.status(403).json({ success: false, error: true, message: "Token not found!" });
    }
  } catch (error) {
   // console.log(error);
    res.status(403).json({ success: false, error: true, message: "Token expired!" });
  }
};

export default auth;
