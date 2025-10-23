import mongoose, { Schema, Document } from "mongoose";
import { IPost} from "./post.interface";

const PostSchema: Schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    postDetails: { type: String, required: true },
    category: { type: String,enum: ["Frontend", "Database", "Backend"],required: true},
    images: {
      type: [String],
      default: [],
    },
    resourceLink: { type: String },
   
  },
  { timestamps: true }
);




export const Post = mongoose.model<IPost & Document>("Post", PostSchema);

