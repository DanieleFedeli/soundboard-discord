import Sound from "~/database/models/sound.schema";
import { HandlerFn } from "~/types/handlerFn.type";

const removeSound: HandlerFn = async function removeSound(
  { channel },
  serverId,
  args
) {
  try {
    Sound.deleteOne({
      serverId,
      name: args[0],
    });
  } catch (e) {
    return channel.send(e.message);
  }
};

export default removeSound;
