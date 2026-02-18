import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const CommentSchema = new Schema({
  text: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model<IComment>("Comment", CommentSchema);
