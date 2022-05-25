/** Create or Insert User (Business or Customer) into Prisma database **/

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const upsertUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json( { message: ReasonPhrases.METHOD_NOT_ALLOWED });
  }

  try {
    let { address, balance } = req.body;
    const lAddress = address.toLowerCase();
    const user = await prisma.customer.upsert({
      where: { address: lAddress },
      create: {
        address: lAddress,
        balance,
      },
      update: {}
    });

    res.status(StatusCodes.CREATED).json({ user });
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err });
  }
}

export default upsertUser;