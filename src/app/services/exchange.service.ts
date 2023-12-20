import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private updateGameServiceFunction: () => Promise<void> = async () : Promise<void> => {
  };
  private updateSetServiceFunction: () => Promise<void> = async () : Promise<void>  => {
  };
  private updateUserServiceFunction: () => Promise<void> = async () : Promise<void>  => {
  };
  private updateGameFunction: () => Promise<void> = async () : Promise<void> => {
  };
  private showUserPopupFunction: () => void = () : void => {
  };
  private afterPopupSubmitFunction: () => Promise<void> = async () : Promise<void> => {
  };

  constructor() {
  }

  public setUserServiceFunction(fun: () => Promise<void>): void {
    this.updateUserServiceFunction = fun;
  }

  public setSetServiceFunction(fun: () => Promise<void>): void {
    this.updateSetServiceFunction = fun;
  }

  public setGameServiceFunction(fun: () => Promise<void>): void {
    this.updateGameServiceFunction = fun;
  }

  public setGameFunction(fun: () => Promise<void>): void {
    this.updateGameFunction = fun;
  }

  public setShowUserPopup(fun: () => void): void {
    this.showUserPopupFunction = fun;
  }

  public setAfterPopupSubmitFunction(fun: () => Promise<void>): void {
    this.afterPopupSubmitFunction = fun;
  }

  public async executeUpdates(): Promise<void> {
    await this.updateUserServiceFunction();
    await this.updateGameServiceFunction();
    await this.updateSetServiceFunction();
  }

  public async executeGameUpdates(): Promise<void> {
    await this.updateGameFunction();
  }

  public showUserPopup(): void{
    this.showUserPopupFunction();
  }

  public async afterPopupSubmit(): Promise<void> {
    await this.afterPopupSubmitFunction();
  }

  public setId: number | undefined = undefined;
  public adminMode: boolean = false;
}
