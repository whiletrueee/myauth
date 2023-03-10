import { Request, Response } from "express";
import { config } from "dotenv";
import {  getDB } from "../config/database";
import { ObjectId } from "mongodb";
import { z } from "zod";
config();

export const registerUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const user = userSchema.parse(req.body);
  try {
    const db = await getDB();
    const collection = db.collection("users");
    const count = await collection.findOne({
      _id: new ObjectId("64080a8a5fe4b12b34e428f2"),
    });
    let username: string;

    if (user.name.split(" ").length > 1) {
      username =
        (
          user.name.split(" ")[0].slice(0, 1).toLowerCase() +
            user.name.split(" ")[1].slice(0, 1).toLowerCase() ??
          user.name.split(" ")[0].slice(1, 2)
        ).toLowerCase() + count?.count;
    } else {
      username = user.name.slice(0, 2).toLowerCase() + count?.count;
    }

    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      username: username,
    };

    await collection.insertOne(userData);

    await collection.updateOne(
      { _id: new ObjectId("64080a8a5fe4b12b34e428f2") },
      {
        $set: {
          count: count?.count + 1,
        },
      },
      { upsert: false }
    );

    res.send("ok").status(200);
  } catch (err: any) {
    console.log(err);
  }
};
