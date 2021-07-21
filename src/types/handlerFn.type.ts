import { Message } from "discord.js";
import { SoundboardDocument } from "~/database/models/soundboard.schema";

export type MessageOnlyFn = (message: Message) => Promise<Message>;

export type MessageServerOnlyFn = (
  message: Message,
  serverId: SoundboardDocument["_id"]
) => Promise<Message>;

export type MessageServerArgsFn = (
  message: Message,
  serverId: SoundboardDocument["_id"],
  args: string[]
) => Promise<Message>;

export type HandlerFn =
  | MessageOnlyFn
  | MessageServerOnlyFn
  | MessageServerArgsFn;
