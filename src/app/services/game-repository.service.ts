import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Game} from "../models/game";

const API_URL = environment.apiHost + 'game/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class GameRepository {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  public async joinGame(game: Game, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "joinGame",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant join game");
    }

    this.tokenStorage.saveGame(game);
  }

  public async generateGame(user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "generateGame",
      user: user
    }, httpOptions).toPromise();
    if (!data) {
      throw new Error("Cant generate game");
    }

    this.tokenStorage.saveGame(data);
  }

  public async getGameInfo(game: Game, user: User): Promise<Game> {
    let data = await this.http.post<any>(API_URL, {
      method: "getGameInfo",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data) {
      throw new Error("Cant get game info");
    }

    return data;
  }

  public async quitFromGame(game: Game, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "quitFromGame",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant quit game");
    }

    this.tokenStorage.clearGame();
  }

  public async startGame(game: Game, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "startGame",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant start game");
    }
  }

  public async stopGame(game: Game, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "stopGame",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant stop game");
    }
  }

  public async kickUser(game: Game, user: User, userId: number): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "kickUser",
      game: game,
      user: user,
      userId: userId
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant kick user");
    }
  }

  public async changeMode(game: Game, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "changeMode",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant change set");
    }
  }

  public async isAdmin(game: Game, user: User): Promise<boolean> {
    let data = await this.http.post<any>(API_URL, {
      method: "isAdmin",
      game: game,
      user: user
    }, httpOptions).toPromise();
    if (data === null) {
      throw new Error("Cant get admin info");
    }

    return data;
  }
}
