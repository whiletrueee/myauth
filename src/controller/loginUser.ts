import { Request, Response } from "express";
import { config } from "dotenv";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userLogin } from "../models/user";
config();

export const loginUser = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });
  let user = loginSchema.safeParse(req.body);

  try {
    if (!user.success) {
      throw new Error("Invalid data");
    }

    const getUser = await userLogin(user.data.email, user.data.password);

    const secret = process.env.SECRET_KEY!;
    const token = jwt.sign({ username: getUser.username }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res
      .status(200)
      .json({ message: "Successfully logged in", auth: true, token });
  } catch (err: any) {
    res.status(err.status ?? 500).json({ message: err.message, auth: false });
    console.log(err);
  }
};
