import { Request, Response } from "express";
import { config } from "dotenv";
import { z } from "zod";
import { userRegister } from "../models/user";
config();

export const registerUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const userdata = userSchema.safeParse(req.body);

  try {
    if (!userdata.success) {
      throw new Error("Invalid data provided");
    }

    const signup = await userRegister(userdata.data);
    res.status(200).json(signup);
    
  } catch (err: any) {
    res.status(err.statusCode ?? 500).json({
      auth: false,
      message: err.message ?? "Internal Server Error",
    });
    console.log(err);
  }
};
