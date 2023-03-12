import { Request, Response } from "express";
import { config } from "dotenv";
import { userLogin, userRegister } from "../services/user";
import { getUser } from "../services/user";
import { loginSchema, registerSchema } from "../utils/userSchema";
import { loginToken, verifyToken } from "../utils/jwt";
config();

export const registerUser = async (req: Request, res: Response) => {
  const userdata = registerSchema.safeParse(req.body);

  try {
    if (!userdata.success) {
      throw { statusCode: 400, message: "Invalid data provided" };
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

export const loginUser = async (req: Request, res: Response) => {
  const user = loginSchema.safeParse(req.body);

  try {
    if (!user.success) {
      throw { statusCode: 400, message: "Invalid data provided" };
    }

    const getUser = await userLogin(user.data.email, user.data.password);
    const token = loginToken(getUser.username);
    res
      .status(200)
      .json({ message: "Successfully logged in", auth: true, token });
  } catch (err: any) {
    res.status(err.status ?? 500).json({ message: err.message, auth: false });
    console.log(err);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const verify = verifyToken(req.headers.authorization);
    if (!verify) {
      throw { status: 401, message: "Invalid token" };
    } else {
      const user = await getUser(verify.username);
      res
        .status(200)
        .json({
          message: "true user",
          auth: true,
          user: { name: user.name, email: user.email, username: user.username },
        });
    }
  } catch (err: any) {
    res
      .status(err.status ?? 500)
      .json({ message: err.message, success: false });
    console.log(err);
  }
};
