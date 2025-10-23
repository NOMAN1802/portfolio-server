import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "./project.interface";



const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    category: { type: String,enum: ["frontend", "fullstack"],required: true},
    images: {
      type: [String],
      default: [],
    },
    projectDetails: { type: String },
    gitLink: { type: String },
    liveLink: { type: String },
  },
  { timestamps: true }
);



export const Project = mongoose.model<IProject & Document>("Project", ProjectSchema);

