import Sound from "~/database/models/sound.schema";
import { MessageServerOnlyFn } from "~/types/handlerFn.type";

const listSound: MessageServerOnlyFn = async function listSound(
  { channel },
  serverId
) {
  try {
    const sounds = await Sound.find({
      serverId,
    }).exec();

    const soundText = sounds.map((sound) => `${sound.name}\t`);
    return channel.send(soundText);
  } catch (e) {
    console.error(e);
    return channel.send(e.message);
  }
};

export default listSound;
