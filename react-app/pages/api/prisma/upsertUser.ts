/** Create or Insert User (Business or Customer) into Prisma database **/

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const upsertUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json( { message: "Method is not allowed "});
  }

  try {
    let { address, balance } = req.body;
    console.log(address);
    console.log(balance);
    const user = await prisma.customer.upsert({
      where: { address: address },
      update: {
        balance: balance,
      },
      create: {
        address: address,
        balance: balance,
      }
    });

    res.status(200).json({ user });

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}

export default upsertUser;