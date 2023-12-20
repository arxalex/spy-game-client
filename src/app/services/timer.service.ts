import {Injectable} from '@angular/core';
import {ExchangeService} from "./exchange.service";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private updaterInterval: NodeJS.Timeout | undefined;
  private gameInterval: NodeJS.Timeout | undefined;
  private get isUpdaterIntervalStarted(): boolean {
    return this.updaterInterval !== undefined;
  }
  private get isGameIntervalStarted(): boolean {
    return this.gameInterval !== undefined;
  }
  constructor(private exchangeService: ExchangeService) {
  }

  public startUpdaterInterval(inGame: boolean = false): void {
    if(!this.isUpdaterIntervalStarted) {
      this.updaterInterval = setInterval(async (): Promise<void> => {
        await this.exchangeService.executeUpdates();
      }, inGame ? 10000 : 4000);
    }
  }

  public stopUpdaterInterval(): void {
    if(this.isUpdaterIntervalStarted) {
      clearInterval(this.updaterInterval);
      this.updaterInterval = undefined;
    }
  }

  public startGameInterval(): void {
    if(!this.isGameIntervalStarted) {
      this.gameInterval = setInterval(async (): Promise<void> => {
        await this.exchangeService.executeGameUpdates();
      }, 500);
      this.stopUpdaterInterval();
      this.startUpdaterInterval(true);
    }
  }

  public stopGameInterval(): void {
    if(this.isGameIntervalStarted) {
      clearInterval(this.gameInterval);
      this.gameInterval = undefined;
      this.stopUpdaterInterval();
      this.startUpdaterInterval();
    }
  }
}
