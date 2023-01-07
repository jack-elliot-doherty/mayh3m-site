import { sendMail } from "./sendMail";

export const sendConfirmationEmail = async (
  email: string,
  dropName: string
) => {
  await sendMail(
    email,
    "You've applied | MAYH3M",
    "Confirmation email for " + dropName + " drop"
  );
};
