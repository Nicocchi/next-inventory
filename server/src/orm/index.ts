import { connect, Schema, model, Mongoose } from "mongoose";
import { User, UserSettings } from "@types";

export const DatabaseInit = async () => {
  try {
    await connect(
      `${process.env.DB_MONGO_URL!}/${process.env.DB_MONGO_DATABASE}`
    );
    console.log("Connection Mongo: OK.");
  } catch (err) {
    throw new Error("Unable to connect to the database: " + err);
  }
};

// Mongoose models
// TODO(Ecy): Add typing to the rest of the models
const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userSettings: Object,
  },
  { timestamps: true }
);
export const UserModel = model<User>("User", UserSchema);
