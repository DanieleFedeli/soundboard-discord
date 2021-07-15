import Sound from "~/database/models/sound.schema";
import { HandlerFn } from "~/types/handlerFn.type";

const insertSound: HandlerFn = async function insertSound(
  { attachments, channel },
  serverId,
  args
) {
  if (attachments.array().length !== 1) {
    return channel.send(
      "Devi inviare un allegato .mp3 per inserirlo nella soundboard."
    );
  }

  try {
    const _sound = Sound.build({
      url: attachments.array()[0].url,
      name: args[0],
      serverId,
    });

    _sound.save();
  } catch (e) {
    console.error({ e });
    return channel.send(e.message);
  }
};

export default insertSound;
