import { Request, Response } from "express";
import { config } from "dotenv";
import { getDB } from "../config/database";
import { ObjectId } from "mongodb";
import { z } from "zod";
config();

export const loginUser = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });
  console.log(req.body);
  let user = loginSchema.parse(req.body);

  try {
    const db = await getDB();
    const collection = db.collection("users");

    const trueCred = await collection.findOne({ email: user.email });

    if (!trueCred) {
      return res.send("User not found").status(404);
    } else {
      if (trueCred.password !== user.password) {
        return res.send("Wrong password").status(404);
      }
    }

    res.send("login successfull").status(200);
  } catch (err: any) {
    console.log(err);
  }
};
