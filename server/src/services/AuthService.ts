import { User } from "@types";
import { UserModel } from "@orm";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { CompareSync, GenerateToken, ValidateToken } from "utils";
import { Logger } from "utils/Logger";

export async function AuthScope(token: string): Promise<User | undefined> {
  if (!token) return;
  const user = ValidateToken(token);
  return user;
}

export async function Login(
  parent: any,
  args: { email: string; password: string },
  context: any,
  info: any
): Promise<{ email: string; token: string } | null> {
  try {
    const { email, password } = args;
    if (!email || !password) throw new Error();

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error();

    // TODO: SQL timed attack prevention
    if (!CompareSync(password, user.password)) throw new Error();

    // NOTE: Inject
    const token = GenerateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return { email: user.email, token };
  } catch (err) {
    Logger.log(err);
  }
  return null;
}
