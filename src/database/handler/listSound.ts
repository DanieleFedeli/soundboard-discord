import Sound from "~/database/models/sound.schema";
import { MessageOnlyFn } from "~/types/handlerFn.type";

const listSound: MessageOnlyFn = async function listSound(
  { channel },
  serverId
) {
  try {
    const sounds = Sound.find({
      serverId,
    });

    return channel.send((await sounds).join(", "));
  } catch (e) {
    console.error(e);
    return channel.send(e.message);
  }
};

export default listSound;
