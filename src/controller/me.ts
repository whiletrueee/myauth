import { Request, Response } from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getUser } from "../models/user";
config();

interface JwtPayload {
  username: string;
}

export const me = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET_KEY!;
  if (!token) {
    return res
      .status(406)
      .json({ message: "token is not provided in header.", auth: false });
  }
  try {
    const verify = jwt.verify(token, secret) as JwtPayload;
    if (!verify) {
      throw new Error("Invalid token");
    } else {
      const user = await getUser(verify.username);
      res.status(200).json({ message: "true user", auth: true, user });
    }
  } catch (err: any) {
    res
      .status(err.status ?? 500)
      .json({ message: err.message, success: false });
    console.log(err);
  }
};
