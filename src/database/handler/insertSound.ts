import Sound from "~/database/models/sound.schema";
import { HandlerFn } from "~/types/handlerFn.type";
import { messageError } from "~/utility/messageError";

const insertSound: HandlerFn = async function insertSound(
  { attachments, channel },
  serverId,
  args
) {
  if (attachments.array().length !== 1) {
    return channel.send(messageError.ENOFOUND);
  }

  const attachment = attachments.array()[0];

  if (!attachment.name.endsWith(".mp3"))
    return channel.send(messageError.ENOFOUND);

  try {
    const _sound = Sound.build({
      url: attachment.url,
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
