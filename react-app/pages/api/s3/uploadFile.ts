/** Upload file to AWS S3 bucket **/
import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const s3 = new S3({
  region: "ap-southeast-2",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

const uploadFile =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
  }

  try {
    let { name, type } = req.body;
    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    res.status(StatusCodes.CREATED).json({ url });

  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};

export default  uploadFile;