import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    const subscriber = await prisma.newsletterSubscriber.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(subscriber);
  } catch (err) {
    console.log(err);
  }
};
