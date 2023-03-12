import { getDB } from "../config/database";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { generateUsername } from "../utils/generateUsername";

export const userLogin = async (email: string, password: string) => {
  const db = await getDB();
  const collection = db.collection("users");
  const trueCred = await collection.findOne({ email });
  if (!trueCred) {
    throw new Error("User not found");
  } else {
    const compare = await bcrypt.compare(password, trueCred.password);
    if (!compare) {
      throw new Error("Invalid password");
    }
    return trueCred;
  }
};

export const userRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const db = await getDB();
  const collection = db.collection("users");

  const alreadyRegisterd = await collection.findOne({
    email: data.email,
  });

  if (alreadyRegisterd) {
    throw new Error("User already registerd");
  } else {
    const count = await collection.findOne({
      _id: new ObjectId("64080a8a5fe4b12b34e428f2"),
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const dbUser = {
      name: data.name,
      email: data.email,
      password: hash,
      username: generateUsername(data.name) + count?.count,
    };

    const inserted = await collection.insertOne(dbUser);

    await collection.updateOne(
      { _id: new ObjectId("64080a8a5fe4b12b34e428f2") },
      {
        $set: {
          count: count?.count + 1,
        },
      },
      { upsert: false }
    );

    if (!inserted) {
      throw new Error("User not inserted");
    } else {
      return { message: "Successfully registerd", auth: true };
    }
  }
};

export const getUser = async (username: string) => {
  const db = await getDB();
  const collection = db.collection("users");
  const finduser = await collection.findOne({ username });
  if (!finduser) {
    throw new Error("User not found");
  } else {
    return finduser;
  }
};
