import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const loginToken = (username: string) => {
  const secret = process.env.SECRET_KEY!;
  return jwt.sign({ username }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
};

export const verifyToken = (token: string | undefined) => {
  const secret = process.env.SECRET_KEY!;
  if (!token) {
    throw { message: "token is not provided in header.", auth: false };
  }
  return jwt.verify(token, secret) as JwtPayload;
};
