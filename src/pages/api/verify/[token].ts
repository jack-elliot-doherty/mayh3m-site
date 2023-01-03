import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const verifyApplicantByTokenHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { tokenId } = req.query as { tokenId: string };
    const token = await prisma.applicantVerificationToken.findFirst({
        where: { token: tokenId }
    });
    if (!token) {
        res.status(404).send("Token Not found");
        return;
    }
    const updateApplicant = await prisma.applicant.update({
        where: { id: token.applicantId },
        data: { verified: true },
    });
    const deleteToken = await prisma.applicantVerificationToken.delete({
        where: { id: token.id },
    });
    res.redirect(307, `/verify/${updateApplicant.id}`).end()
    }

export default verifyApplicantByTokenHandler;