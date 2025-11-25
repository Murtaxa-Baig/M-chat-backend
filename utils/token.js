import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
  const accessTokenSecret = process.env.APP_SECRET || "";
  const { name, email } = user;
  return jwt.sign({ name, email }, accessTokenSecret, {
    expiresIn: "1d",
  });
};
