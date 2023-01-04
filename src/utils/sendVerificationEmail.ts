import { getBaseUrl } from "./api";
import nodemailer from "nodemailer";

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
          subject: "You're nearly in | Verify your email",
          text: "Click the link below to verify your application:\n\n" + getBaseUrl() + "/api/verify/" + token,
        });
        console.log("email sent sucessfully");
      } catch (error) {
        console.log("email not sent");
        console.log(error);
      }
      console.log(process.env.USER, process.env.PASS, process.env.HOST, process.env.SERVICE);
    };