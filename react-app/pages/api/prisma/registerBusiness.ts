/** Create Business into Prisma database **/

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const registerBusiness = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json( { message: ReasonPhrases.METHOD_NOT_ALLOWED });
  }

  try {
    let { address, location, phone, balance } = req.body;
    const user = await prisma.business.create({
      data: {
        address: address.toLowerCase(),
        location,
        phone,
        balance,
      }
    });

    res.status(StatusCodes.CREATED).json({ user });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err });
  }
}

export default registerBusiness;