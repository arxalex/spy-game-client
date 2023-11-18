import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Game} from "../models/game";

const USER_ID = 'user-id';
const GAME_ID = 'game-id';
const SEPARATOR = ';';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  public clearStorage(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    const item: string = user.id + SEPARATOR + user.pass;
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, item);
  }

  public getUser(): User {
    const item = window.sessionStorage.getItem(USER_ID);
    if (!item) {
      throw new Error("Cant get user");
    }

    const parts = item.split(SEPARATOR);
    return {
      id: Number(parts[0]),
      pass: parts[1]
    };
  }

  public saveGame(game: Game): void {
    const item: string = game.id + SEPARATOR + game.pass;
    window.sessionStorage.removeItem(GAME_ID);
    window.sessionStorage.setItem(GAME_ID, item);
  }

  public getGame(): Game {
    const item = window.sessionStorage.getItem(GAME_ID);
    if (!item) {
      throw new Error("Cant get game");
    }

    const parts = item.split(SEPARATOR);
    return {
      id: Number(parts[0]),
      pass: parts[1],
      setid: undefined,
      started: undefined,
      wordid: undefined
    };
  }

  public clearGame(): void {
    window.sessionStorage.removeItem(GAME_ID);
  }
}
