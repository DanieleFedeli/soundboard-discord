import { Client, Message } from "discord.js";
import { Commands } from "./utility/commands.enum";
import dotenv from "dotenv";
import accessEnv from "./utility/accessEnv";
import initConnection from "./database/database";

dotenv.config();

const client = new Client({ fetchAllMembers: true });

client.once("ready", function () {
	console.log(`Logges ad ${client.user?.tag}`);
	initConnection();
});

client.on("message", message => {
	console.log(client);
	if (message.content.startsWith(Commands.INSERT)) {
		return insertSound(message);
	}
});

function insertSound(message: Message) {
	const { attachments, content } = message;

	console.info({ message });

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
		return;
	} catch (e) {
		return message.channel.send(e.message);
	}
}

const DISCORD_TOKEN = accessEnv<string>("DISCORD_TOKEN");
client.login(DISCORD_TOKEN).catch(console.error);
