export interface Game {
  id: number;
  pass: string;
  setid: number | undefined,
  started: boolean | undefined,
  wordid: number | undefined | null,
  stoptime: number | undefined | null,
  infinitemode: boolean | undefined,
  duration: number | undefined
}
