import mongoose from "mongoose";
import { SoundDocument } from "./sound.schema";

export interface ISoundboard {
  name: string;
}

export interface SoundboardModelInterface
  extends mongoose.Model<SoundboardDocument> {
  build: (attr: ISoundboard) => SoundboardDocument;
  findOrCreate: (
    condition: mongoose.FilterQuery<unknown>,
    document?: SoundDocument
  ) => ReturnType<typeof Soundboard["findOne"]>;
}

export interface SoundboardDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const soundboardSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

soundboardSchema.pre("save", function (next) {
  next();
});

soundboardSchema.statics.build = (attr: ISoundboard) => new Soundboard(attr);
soundboardSchema.statics.findOrCreate = async function (
  condition: mongoose.FilterQuery<unknown>,
  document?: SoundboardDocument
) {
  const one = await this.findOne(condition);
  return one ?? this.create(document ?? condition);
};

const Soundboard = mongoose.model<SoundboardDocument, SoundboardModelInterface>(
  "Soundboard",
  soundboardSchema
);

export default Soundboard;
