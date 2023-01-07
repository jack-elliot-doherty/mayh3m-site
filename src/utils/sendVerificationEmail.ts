import { getBaseUrl } from "./api";
import { sendMail } from "./sendMail";

export const sendVerificationEmail = async (email: string, token: string) => {
  await sendMail(
    email,
    "You're nearly in | Verify your email",
    "Click the link below to verify your application:\n\n" +
      getBaseUrl() +
      "/api/verify/" +
      token
  );
};
