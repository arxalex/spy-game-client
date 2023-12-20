import {Injectable} from "@angular/core";
import {Game} from "../models/game";


@Injectable({
  providedIn: 'root'
})
export class GameMapper {
  constructor() {
  }

  public getFromId(id: string): Game {
    return {
      id: Number(id.slice(0, -6)),
      pass: id.slice(-6),
      setid: undefined,
      started: undefined,
      wordid: undefined,
      duration: undefined,
      infinitemode: undefined,
      stoptime: undefined
    };
  }

  public toId(value: Game): string {
    return value.id + value.pass;
  }
}
