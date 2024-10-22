import { ObjectId, Types } from "mongoose";

export type IPost = {
  title: string;
  postDetails: string;
  category: "Frontend" | "Database" | "Backend" ; 
  images?: string[];
 
};

export type IComment = {
  content: string;
  commentator: Types.ObjectId;
};




