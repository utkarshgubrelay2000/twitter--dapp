import { user } from "../../db/models";
import { Request, Response } from "express";
import axios from "axios";
import { S3 } from "../../helpers/mailService";

export const get_my_profile = async (req: any, res: Response): Promise<any> => {
  try {
  console.log('hellooo')
    let userFound = await user.findOne({ where: { email: req.user.email } });

    console.log(userFound)
   res.json({error:false,data:userFound})
  } catch (error: any) {
    res.status(503).json({ error: true, msg: error.message });
  }
};

export const update_my_profile = async (req: any, res: any) => {
  let payload = req.body;

  try {
    let userFound = await user.update({...payload},{ where: { email: payload.email } });
  res.json({error:false,data:userFound})
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};


export const imageUpload=async (req: any, res: any) =>{
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  console.log(fileName,fileType)
  const s3Params = {
    Bucket: 'testbucketeduon',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    //cors
    ACL: 'public-read',
    
  };
  S3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://testbucketeduon.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
    
  });
}