import { Client, Message } from "discord.js";
import { Commands } from "./utility/commands.enum";
import dotenv from "dotenv";
import SoundBoard from "./utility/Soundboard";

dotenv.config();

const client = new Client({ fetchAllMembers: true });

client.once("ready", () => console.log(`Logged in as ${client.user?.tag}`));

client.on("message", message => {
	if (message.content.startsWith(Commands.INSERT)) {
		return insertSound(message);
	}
	// case Commands.REMOVE: {
	// 	return removeSound();
	// }
	// case Commands.CLEAR: {
	// 	return clearSound();
	// }
	// case Commands.SOUND: {
	// 	return playSound();
	// }
	// case Commands.LIST: {
	// 	return listSound();
	// }
});

function insertSound(message: Message) {
	const { attachments, content } = message;

	const splitted = content.split(" ");
	if (splitted.length !== 2)
		return message.channel.send(
			`Devi inviare il comando ${Commands.INSERT} seguito dal name del souno:\n${Commands.INSERT} boom`
		);

	if (attachments.array().length !== 1)
		return message.channel.send(
			"Devi inviare un allegato .mp3 per inserirlo nella soundboard."
		);
	try {
		SoundBoard.getInstance().add(splitted[1], attachments.array()[0]);
	} catch (e) {
		return message.channel.send(e.message);
	}
}

client.login(process.env.DISCORD_TOKEN);
