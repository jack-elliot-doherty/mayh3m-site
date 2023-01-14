import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const unSubEmail = Array.isArray(query.unSubEmail)
    ? query.unSubEmail[0]
    : query.unSubEmail;

  if (!unSubEmail) {
    return res.status(400).json({ message: "Missing email" });
  }

  console.log("sssssssss", unSubEmail);

  try {
    // check if email exists
    const subscriberExists = await prisma.newsletterSubscriber.findFirst({
      where: {
        email: unSubEmail,
      },
    });

    if (!subscriberExists) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    await prisma.newsletterSubscriber.delete({
      where: {
        email: unSubEmail,
      },
    });

    res.status(200).json({ message: "Unsubscribed" });
  } catch (err) {
    console.log(err);
  }
};

export default handler;
