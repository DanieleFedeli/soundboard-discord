import mongoose, { Schema } from "mongoose";

interface ISoundboard extends mongoose.Document {
	_id: number;
	serverName: string;
	createAt: Date;
	updateAt: Date;
}

const soundboardSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	serverName: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

soundboardSchema.pre("save", function (next) {
	next();
});

const Soundboard = mongoose.model<ISoundboard>("Soundboard", soundboardSchema);

export default Soundboard;
