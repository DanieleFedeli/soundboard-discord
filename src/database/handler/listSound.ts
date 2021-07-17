import Sound from "~/database/models/sound.schema";
import { MessageOnlyFn } from "~/types/handlerFn.type";

const listSound: MessageOnlyFn = async function listSound(
  { channel },
  serverId
) {
  try {
    const sounds = await Sound.find({
      serverId,
    }).exec();

    const soundText = sounds.map((sound) => `${sound.name}: ${sound.url}\n`);
    return channel.send(soundText);
  } catch (e) {
    console.error(e);
    return channel.send(e.message);
  }
};

export default listSound;
