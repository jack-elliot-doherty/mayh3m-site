import { getBaseUrl } from "./api";

const nodemailer = require("nodemailer");

export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        const transporter = nodemailer.createTransport({
          host: process.env.HOST,
          service: process.env.SERVICE,
          port: 587,
          secure: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        });
    
        await transporter.sendMail({
          from: process.env.USER,
          to: email,
          subject: subject,
          text: getBaseUrl() + "/verify/" + token,
        });
        console.log("email sent sucessfully");
      } catch (error) {
        console.log("email not sent");
        console.log(error);
      }
    };

    env("DATABASE_URL")