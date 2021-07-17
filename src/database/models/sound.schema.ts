import mongoose from "mongoose";
import { SoundboardDocument } from "./soundboard.schema";

export interface ISound {
  url: string;
  name: string;
  serverId: SoundboardDocument["_id"];
}

export interface SoundModelInterface extends mongoose.Model<SoundDocument> {
  build: (attr: ISound) => SoundDocument;
}

export interface SoundDocument extends mongoose.Document {
  url: string;
  name: string;
  serverId: SoundboardDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const soundSchema = new mongoose.Schema<SoundDocument>({
  serverId: mongoose.Schema.Types.ObjectId,
  url: { type: String, required: true },
  name: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

soundSchema.index({ serverId: 1, name: 1 }, { unique: true });
soundSchema.statics.build = (attr: ISound) => new Sound(attr);

soundSchema.pre("save", function (next) {
  next();
});

const Sound = mongoose.model<SoundDocument, SoundModelInterface>(
  "Sound",
  soundSchema
);

export default Sound;
