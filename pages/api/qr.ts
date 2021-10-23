// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";

interface PresenterRecord {
  pictureUrl?: string;
  firstName: string;
  lastName: string;
  presentationTitle: string;
  confName: string;
  confLocation: string;
}

type Response =
  | {
      url: string;
    }
  | {
      error: String;
    };

export default async function asynchandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const url = await QRCode.toDataURL("https://google.com");
    return res.status(200).json({ url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: (error as Error).message });
  }
}