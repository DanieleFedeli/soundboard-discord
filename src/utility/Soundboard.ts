import { MessageAttachment } from "discord.js";

interface ISoundCache {
	[key: string]: MessageAttachment | undefined;
}

interface ISoundBoard {
	clear: () => void;
	add: (key: string, value: MessageAttachment) => void;
	list: () => ISoundCache;
	remove: (key: string) => MessageAttachment | undefined;
}

export default class SoundBoard implements ISoundBoard {
	private sounds: ISoundCache;
	private static instance: SoundBoard;

	private constructor() {
		this.sounds = {};
	}

	clear() {
		this.sounds = {};
	}

	add(key: string, value: MessageAttachment) {
		if (value.name?.split(".")[1] !== ".mp3")
			throw new Error("Il file deve essere un .mp3");
		this.sounds[key] = value;
	}

	list() {
		return { ...this.sounds };
	}

	remove(key: string) {
		const { [key]: value, ...newSounds } = this.sounds;
		return value;
	}

	public static getInstance() {
		if (!SoundBoard.instance) {
			SoundBoard.instance = new SoundBoard();
		}
		return SoundBoard.instance;
	}
}
