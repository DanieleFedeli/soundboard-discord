import Soundboard from "./soundboard.schema";
import Sound from "./sound.schema";

export default async function initModels(): Promise<void> {
  await Soundboard.init();
  await Sound.init();
}

export { Soundboard, Sound };
