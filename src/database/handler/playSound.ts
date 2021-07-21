import Sound from "~/database/models/sound.schema";
import { HandlerFn } from "~/types/handlerFn.type";
import { messageError } from "~/utility/messageError";

const playSound: HandlerFn = async function playSound(
  { member, channel },
  serverId,
  args
) {
  if (!member.voice.channel) return channel.send(messageError.ENOVOICE);

  const connection = await member.voice.channel.join();

  try {
    const sound = await Sound.findOne({ name: args[0], serverId }).exec();
    if (!sound) return channel.send(messageError.ENOSOUND);
    connection.play(sound.url);
  } catch (e) {
    return channel.send(e.message);
  }
};

export default playSound;
