import { MessageOnlyFn } from "~/types/handlerFn.type";

const helpCommand: MessageOnlyFn = async function helpCommand({ channel }) {
  return channel.send("help");
};

export default helpCommand;
