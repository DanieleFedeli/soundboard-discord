import { Client } from "discord.js";
import dotenv from "dotenv";
import { Commands } from "./utility/commands.enum";
import accessEnv from "./utility/accessEnv";
import initConnection from "./database/database";

import {
  helpCommand,
  insertSound,
  listSounds,
  playSound,
  removeSound,
} from "./database/handler";
import initModels, { Soundboard } from "./database/models";

const prefix = "!";

dotenv.config();

initConnection();
const client = new Client();

client.once("ready", function () {
  client.guilds.cache.forEach((guild) => {
    Soundboard.findOrCreate({ name: guild.id });
  });
});

client.on("message", async (message) => {
  if (!message.guild?.available) return;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const serverId = message.guild.id;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();
  console.log(`[MESSAGE] Command: ${command}, args: ${args}`);

  const _soundboard = await Soundboard.findOrCreate({ name: serverId });

  switch (command) {
    case Commands.INSERT: {
      console.log(`[INSERT HANDLER]`);
      if (args.length !== 1) return;
      return insertSound(message, _soundboard._id, args);
    }
    case Commands.REMOVE: {
      console.log(`[REMOVE HANDLER]`);
      if (args.length !== 1) return;
      return removeSound(message, _soundboard._id, args);
    }
    case Commands.LIST:
      console.log(`[LIST HANDLER]`);
      return listSounds(message, _soundboard._id);
    case Commands.HELP:
      console.log(`[HELP HANDLER]`);
      return helpCommand(message);
    default:
      console.log(`[PLAY HANDLER]`, command);
      return playSound(message, _soundboard._id, [command]);
  }
});

const DISCORD_TOKEN = accessEnv<string>("DISCORD_TOKEN");
initModels().then(() => client.login(DISCORD_TOKEN).catch(console.error));
