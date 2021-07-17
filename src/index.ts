import { Client } from "discord.js";
import dotenv from "dotenv";
import { Commands } from "./utility/commands.enum";
import accessEnv from "./utility/accessEnv";
import initConnection from "./database/database";

import {
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
// client.on("debug", console.debug);
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

  const _soundboard = await Soundboard.findOrCreate({ name: serverId });

  switch (command) {
    case Commands.INSERT:
      if (args.length !== 1) return;
      return insertSound(message, _soundboard._id, args);
    case Commands.REMOVE:
      if (args.length !== 1) return;
      return removeSound(message, _soundboard._id, args);
    case Commands.LIST:
      return listSounds(message, _soundboard._id);
    case Commands.PLAY:
      if (args.length !== 1) return;
      return playSound(message, _soundboard._id, args);
    default:
      return;
  }
});

const DISCORD_TOKEN = accessEnv<string>("DISCORD_TOKEN");
initModels().then(() => client.login(DISCORD_TOKEN).catch(console.error));
