import Sound from "~/database/models/sound.schema";
import { DMChannel, Message, NewsChannel, TextChannel } from "discord.js";
import { Schema } from "mongoose";
import { HandlerFn } from "~/types/handlerFn.type";
import { messageError } from "~/utility/messageError";

const insertSound: HandlerFn = async function insertSound(
  { attachments, channel },
  serverId,
  args
) {
  const isFromExternalLink = args.length === 2;
  const isFromAttachment = attachments.array().length === 1;

  if (!(isFromAttachment || isFromExternalLink)) {
    return channel.send(messageError.ENOFOUND);
  }

  const payload: InsertPayload = {
    channel,
    serverId,
    name: args[0],
    link: isFromAttachment ? args[1] : attachments.array()[0].url,
  };

  return _insert(payload);
};

export default insertSound;
interface InsertPayload {
  channel: TextChannel | DMChannel | NewsChannel;
  serverId: Schema.Types.ObjectId;
  name: string;
  link: string;
}

function _insert({
  channel,
  serverId,
  name,
  link,
}: InsertPayload): Promise<Message> {
  if (!link.endsWith(".mp3")) return channel.send(messageError.ENOFOUND);

  try {
    const _sound = Sound.build({
      url: link,
      name: name,
      serverId,
    });

    _sound.save();
  } catch (e) {
    console.error({ e });
    return channel.send(e.message);
  }
}
