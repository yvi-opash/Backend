import mongoose, { Document, Schema } from "mongoose";

export type Role = "admin" | "manager" | "user";

export interface IUser extends Document {
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);