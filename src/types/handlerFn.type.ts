import { Message } from "discord.js";
import { SoundboardDocument } from "~/database/models/soundboard.schema";

export type MessageOnlyFn = (
  message: Message,
  serverId: SoundboardDocument["_id"]
) => Promise<Message>;
export type MessageAndArgsFn = (
  message: Message,
  serverId: SoundboardDocument["_id"],
  args: string[]
) => Promise<Message>;

export type HandlerFn = MessageOnlyFn | MessageAndArgsFn;
