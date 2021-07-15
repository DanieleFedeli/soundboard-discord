import mongoose, { Schema } from "mongoose";

interface ISound extends mongoose.Document {
	_id: number;
	serverId: number;
	url: string;
	name: string;
	createAt: Date;
	updateAt: Date;
}

const soundSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	serverId: Schema.Types.ObjectId,
	url: { type: String, required: true },
	name: { type: String, required: true, trim: true, minLenght: 1 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

soundSchema.pre("save", function (next) {
	next();
});

const Sound = mongoose.model<ISound>("Sound", soundSchema);

export default Sound;
