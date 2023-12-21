import {Injectable} from '@angular/core';
import {GameRepository} from "./game-repository.service";
import {TokenStorageService} from "./token-storage.service";
import {GameMapper} from "../mappers/game-mapper";
import {environment} from "../../environments/environment";
import {Game} from "../models/game";
import {ExchangeService} from "./exchange.service";
import {TimerService} from "./timer.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private joined: boolean = false;
  private admin: boolean = false;
  private gameId: string = "";
  private game: Game = {
    id: 0,
    pass: "",
    setid: undefined,
    started: undefined,
    wordid: undefined,
    duration: undefined,
    infinitemode: undefined,
    stoptime: undefined
  };
  private gameStarted: boolean = false;
  private _users: User[] = [];
  private updateGameServiceFunction: () => Promise<void> = async (): Promise<void> => {
    //this.checkJoin();
    await this.checkGame();
    await this.checkAdmin();
    await this.checkUsers();
  }

  private updateGameFunction: () => Promise<void> = async (): Promise<void> => {
    await this.checkGame();
  }

  constructor(
    private gameRepository: GameRepository,
    private tokenStorage: TokenStorageService,
    private gameMapper: GameMapper,
    private exchangeService: ExchangeService,
    private timerService: TimerService
  ) {
    exchangeService.setGameServiceFunction(this.updateGameServiceFunction);
    exchangeService.setGameFunction(this.updateGameFunction);
    this.updateGameServiceFunction().then(r => {
    });

  }

  public async joinGame(gameId: string): Promise<void> {
    try {
      const game = this.gameMapper.getFromId(gameId);
      const user = this.tokenStorage.getUser();
      this.tokenStorage.clearGame();
      this.reset();
      await this.gameRepository.joinGame(game, user);
      this.joined = true;
      await this.exchangeService.executeUpdates();
      this.timerService.startUpdaterInterval();
    } catch (error: any) {
      if (error.message == this.tokenStorage.CANT_GET_USER_ERROR) {
        this.exchangeService.showUserPopup();
        this.exchangeService.setAfterPopupSubmitFunction(async (): Promise<void> => {
          await this.joinGame(gameId);
          this.exchangeService.setAfterPopupSubmitFunction(async (): Promise<void> => {
          });
        });
      }
      // TODO: show popup
    }
  }

  public async createGame(): Promise<void> {
    try {
      const user = this.tokenStorage.getUser();
      this.tokenStorage.clearGame();
      this.reset();
      await this.gameRepository.generateGame(user);
      this.joined = true;
      await this.exchangeService.executeUpdates();
      this.timerService.startUpdaterInterval();
    } catch (error: any) {
      if (error.message == this.tokenStorage.CANT_GET_USER_ERROR) {
        this.exchangeService.showUserPopup();
        this.exchangeService.setAfterPopupSubmitFunction(async (): Promise<void> => {
          await this.createGame();
          this.exchangeService.setAfterPopupSubmitFunction(async (): Promise<void> => {
          });
        });
      }
      // TODO: show popup
    }
  }

  public get isGameJoined(): boolean {
    return this.joined;
  }

  public get users(): User[] {
    return this._users;
  }

  public get isAdmin(): boolean {
    return this.isGameJoined && this.admin;
  }

  public get timeLeft(): number {
    if (this.isGameStarted && !!this.game.stoptime) {
      return this.game.stoptime - Date.now() / 1000;
    }

    return -1;
  }

  public get isGameStarted(): boolean {
    return this.gameStarted;
  }

  public get isSpy(): boolean {
    return this.isGameStarted && this.game.wordid === null;
  }

  public get gameQrCode(): string {
    return "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + environment.clientLink + "?game=" + this.getGameId;
  }

  public get getGameId(): string {
    return this.gameId;
  }

  public get currentWord(): number | null {
    return this.game.wordid === undefined ? null : this.game.wordid;
  }

  private async checkAdmin(): Promise<void> {
    if (this.joined && this.game.id != 0) {
      try {
        this.admin = await this.gameRepository.isAdmin(this.tokenStorage.getGame(), this.tokenStorage.getUser());
      } catch (error) {
        this.admin = false;
        // TODO: show popup
      }
    } else {
      this.admin = false;
    }
    this.exchangeService.adminMode = this.admin;
  }

  private async checkUsers(): Promise<void> {
    if (this.joined && this.isAdmin) {
      try {
        this._users = await this.gameRepository.getUsers(this.tokenStorage.getGame(), this.tokenStorage.getUser());
      } catch (error) {
        // TODO: show popup
      }
    }
  }

  private checkJoin(): void {
    try {
      const game = this.tokenStorage.getGame();
      this.joined = !!game;
    } catch (error) {
      this.reset();
      // TODO: show popup
    }
  }

  private async checkGame(): Promise<void> {
    try {
      const game = this.tokenStorage.getGame();
      if (!!game) {
        this.gameId = this.gameMapper.toId(game);
        this.game = await this.gameRepository.getGameInfo(game, this.tokenStorage.getUser());
        const oldGameStarted = this.gameStarted;
        this.gameStarted = this.game.started !== undefined && this.game.started;
        this.exchangeService.setId = this.game.setid;
        if (this.gameStarted !== oldGameStarted) {
          if (this.gameStarted) {
            this.onGameStarts();
          } else {
            this.onGameStops();
          }
        }
      } else {
        this.reset();
      }
    } catch (e) {
      this.reset();
      // TODO: show popup
    }
  }

  public async quitGame(): Promise<void> {
    this.tokenStorage.clearGame();
    this.joined = false;
    await this.exchangeService.executeUpdates();
    this.timerService.stopGameInterval();
    this.timerService.stopUpdaterInterval();
  }

  public async leaveGame(): Promise<void> {
    try {
      await this.gameRepository.quitFromGame(this.game, this.tokenStorage.getUser())
      await this.quitGame();
      this.timerService.stopGameInterval();
      this.timerService.stopUpdaterInterval();
    } catch (e) {
      // TODO: show popup
    }
  }

  private reset(): void {
    this.game = {
      id: 0,
      pass: "",
      setid: undefined,
      started: undefined,
      wordid: undefined,
      duration: undefined,
      infinitemode: undefined,
      stoptime: undefined
    };
    this.gameId = "";
    this.exchangeService.setId = undefined;
    this.admin = false;
    this.joined = false;
    this._users = [];
  }

  public async setSet(id: number): Promise<void> {
    if (this.isAdmin) {
      this.game.setid = id;
      await this.gameRepository.changeMode(this.game, this.tokenStorage.getUser());
      await this.exchangeService.executeUpdates();
    }
  }

  public async startGame(): Promise<void> {
    if (!this.isGameStarted && this.isAdmin) {
      await this.gameRepository.startGame(this.game, this.tokenStorage.getUser());
      await this.exchangeService.executeUpdates();
    }
  }

  public async stopGame(): Promise<void> {
    if (this.isGameStarted && this.isAdmin) {
      await this.gameRepository.stopGame(this.game, this.tokenStorage.getUser());
      await this.exchangeService.executeUpdates();
    }
  }

  private onGameStarts(): void {
    this.timerService.startGameInterval();
  }

  private onGameStops(): void {
    this.timerService.stopGameInterval();
  }

  public async kickUser(id: number): Promise<void> {
    try {
      await this.gameRepository.kickUser(this.game, this.tokenStorage.getUser(), id);
    } catch (e) {
      // TODO: show popup
    }
  }
}
