import { Md5 } from "ts-md5/dist/md5";

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return Md5.hashStr(result);
}

export class Song {
  public id: string;
  public name: string;
  public composer: string;
  public style: string;
  public tempo: number;
  public key: string;

  constructor(
    name: string,
    composer: string,
    style: string,
    tempo: number,
    key: string
  ) {
    this.id = makeid(16).toString();
    this.name = name;
    this.composer = composer;
    this.style = style;
    this.tempo = tempo;
    this.key = key;
  }

  // get id() {
  //   return this.id;
  // }
}
