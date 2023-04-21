import { user } from "../../db/models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import eth from '../../helpers/utils' 


export const signup = async (req:Request,res:Response): Promise<any> => {
  let payload=req.body
  
  let userFound = await user.findOne({where:{email:payload.email}});
  
  if (!userFound) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    let newUser = {
      ...payload,
      password: hashedPassword,
    };
    let result = await user.create(newUser);
    
    res.status(200).json({error:false,message:"Successfully Signup "})
  } else {
   res.status(409).json({ error: true, code: 409, message: "email already exist" })
  }
};

export const login = async (req:Request,res:Response): Promise<any> => {
  try {
    let payload=req.body
 console.log(payload)
  let userFound = await user.findOne({
    where: { email: payload.email },
    attributes: {
      exclude: ["createdAt", "deletedAt", "updatedAt"],
    },
  })
  
  if (userFound) {
    const isPasswordValid = await bcrypt.compare(
      payload.password,
      userFound.password
      );
 
    if (isPasswordValid) {
      const token = jwt.sign(
        { email: userFound.email, id: userFound.id,wallet:userFound.wallet_address },
        "test2",
        {
          expiresIn: "240h",
        }
      );


      res.json( { token: token, error: false })
    } else
      res.status(406).json({ error: true, code: 406, message: "Password does not match" });
  }  else {
    res.status(404).json({ error: true, code: 404, message: "email not found" });
  }
} catch (error) {
 console.log(error)   
 res.status(503).json({ error: true, code: 404, message: "Something Went Wrong" });

}
};

export const checkToken=async (req:Request,res:Response)=>{
res.json({error:false,msg:'valid'})
}