import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Game} from "../models/game";
import {GameMapper} from "../mappers/game-mapper";
import {UserMapper} from "../mappers/user-mapper";

const USER_ID = 'user-id';
const GAME_ID = 'game-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public readonly CANT_GET_USER_ERROR: string = "Cant get user";
  constructor(private gameMapper: GameMapper, private userMapper: UserMapper) {
  }

  public clearStorage(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    const item = this.userMapper.toId(user);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, item);
  }

  public getUser(): User {
    const item = window.sessionStorage.getItem(USER_ID);
    if (!item) {
      throw new Error(this.CANT_GET_USER_ERROR);
    }

    return this.userMapper.getFromId(item);
  }

  public saveGame(game: Game): void {
    const item = this.gameMapper.toId(game);
    window.sessionStorage.removeItem(GAME_ID);
    window.sessionStorage.setItem(GAME_ID, item);
  }

  public getGame(): Game {
    const item = window.sessionStorage.getItem(GAME_ID);
    if (!item) {
      throw new Error("Cant get game");
    }

    return this.gameMapper.getFromId(item);
  }

  public clearGame(): void {
    window.sessionStorage.removeItem(GAME_ID);
  }
}
