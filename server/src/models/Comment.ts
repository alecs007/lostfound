import mongoose, { Document, Schema } from "mongoose";

interface CommentDocument extends Document {
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<CommentDocument>("Comment", commentSchema);
