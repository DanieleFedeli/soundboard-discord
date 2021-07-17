interface IMap {
  ENOFOUND: string;
  EEXTENSI: string;
  ENOSOUND: string;
  ENOVOICE: string;
  [key: string]: string;
}
export const messageError: IMap = {
  ENOSOUND: "Non esiste nessun suono con questo nome",
  ENOFOUND: "Devi inviare un allegato .mp3",
  EEXTENSI: "Devi inviare un allegato audio con estensione .mp3",
  ENOVOICE: "Devi essere in un canale vocale",
};
