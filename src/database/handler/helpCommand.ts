import { MessageOnlyFn } from "~/types/handlerFn.type";

const helpString = {
  insertString:
    "Scrivi !insert nomeSouno https://link-al-souno.com/souno.mp3 o !insert nomeSouno come commento di un allegato per aggiungere un suono alla dashboard",

  playString:
    "Scrivi !nomeSuono per riprodurre un suono presente nella dashboard",

  removeString:
    "Scrivi !remove nomeSuono per rimuovere un suono dalla dashboard",

  listString:
    "Scrivi !list per ottenere tutti i suoni presenti nella dashboard",
};

const helpCommand: MessageOnlyFn = async function helpCommand({ channel }) {
  return channel.send(
    Object.keys(helpString).map((value) => `${helpString[value]}\n`)
  );
};

export default helpCommand;
