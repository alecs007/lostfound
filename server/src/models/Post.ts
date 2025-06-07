import mongoose, { Document, Schema } from "mongoose";

interface PostDocument extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  tags?: string[];
  images: string[];
  status: "found" | "lost";
  email: string;
  phone: string;
  lastSeen: Date;
  location: string;
  coordinates: [number, number];
  circleRadius: number;
  promoted: {
    isActive: boolean;
    expiresAt?: Date;
  };
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String, required: true }],
    status: { type: String, enum: ["found", "lost"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    lastSeen: { type: Date, default: Date.now, required: true },
    location: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) => v.length === 2,
        message: (props) => `${props.value} is not a valid coordinate pair!`,
      },
    },
    circleRadius: { type: Number, required: true },
    promoted: {
      isActive: { type: Boolean, default: false },
      expiresAt: { type: Date },
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.model<PostDocument>("Post", postSchema);
