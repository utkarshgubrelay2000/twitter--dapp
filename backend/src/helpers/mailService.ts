

import nodemailer from "nodemailer";
import AWS from "aws-sdk"


AWS.config.update({
  accessKeyId: process.env.AWS_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
  region: "us-east-1"
});
export const aws_Configured=AWS;
const ses = new AWS.SES();
export const S3=new AWS.S3()
const transporter = nodemailer.createTransport({
  SES: ses,
 
});

transporter.verify((error:any, success:any) => {
  if (error) {
    console.log(error.message,process.env.AWS_USER_ACCESS_SECRET);
  } else {
    console.log("Server is ready to take our messages");
  }
});

  
  export const sendMail = (mailOptions:any) => {
    
    transporter.sendMail(mailOptions, function (error:any, info:any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } 
 