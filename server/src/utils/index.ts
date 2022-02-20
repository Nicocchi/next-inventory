import { Logger } from "./Logger";
import { User } from "types";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export function Hash(pwd: string): string {
  const ENV_SALT = process.env.ENCRYPT_SALT_LEVEL as string;
  const saltLevel = parseInt(ENV_SALT);
  const hash = bcrypt.hashSync(pwd, saltLevel);
  return hash;
}

export function GenerateToken(data: any): string {
  const TOKEN_SECRET = process.env.ENCRYPT_TOKEN_SECRET as string;
  const expiresIn = process.env.ENCRYPT_TOKEN_EXPIRES_IN + " days";
  const token = jwt.sign(data, TOKEN_SECRET, { expiresIn });
  return token;
}

export function CompareSync(pwd: string, pwdToCompare: string): boolean {
  const SECRET = process.env.ENCRYPT_SECRET as string;
  const isMatch = bcrypt.compareSync(pwd, pwdToCompare);
  return isMatch;
}

export function ValidateToken(token: string): any {
  try {
    const TOKEN_SECRET = process.env.ENCRYPT_TOKEN_SECRET as string;
    const tokenToValidate = token.replace("Bearer ", "");
    const user = jwt.verify(tokenToValidate, TOKEN_SECRET);
    return user;
  } catch (err) {
    Logger.log(err);
  }
  return null;
}

export function CheckAuthorization(user: User | undefined) {
  const node_env = <string>process.env.TS_NODE_DEV;
  if (node_env === "true") {
    return undefined;
  } else {
    if (!user) throw new Error("Private route, auth not found.");
  }
  return undefined;
}
