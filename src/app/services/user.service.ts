import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {UserRepository} from "./user-repository.service";
import {ExchangeService} from "./exchange.service";
import {UserMapper} from "../mappers/user-mapper";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private updateUserServiceFunction: () => Promise<void> = async () : Promise<void> => {
    await this.checkUser();
  };
  private loggedIn: boolean = false;
  private userId: string = "";
  private user: User = {id: 0, pass: "", name: undefined};

  constructor(private tokenService: TokenStorageService,
              private userRepository: UserRepository,
              private exchangeService: ExchangeService,
              private userMapper: UserMapper) {
    exchangeService.setUserServiceFunction(this.updateUserServiceFunction);
    try {
      this.tokenService.getUser();
      this.loggedIn = true;
    }
    catch {}
    this.checkUser().then(r => {});
  }
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get userID(): string {
    return this.userId;
  }

  public get userName(): string {
    return this.user.name ?? "";
  }

  private async checkUser(): Promise<void>{
    try {
      await this.userRepository.isUserExists(this.tokenService.getUser());
      this.userId = this.userMapper.toId(this.tokenService.getUser());
      this.user = await this.userRepository.getUserInfo();
      this.loggedIn = true;
    } catch (e) {
      // TODO: show popup
    }
  }

  public async register(name: string): Promise<void> {
    try {
      await this.userRepository.generateUser(name);
      await this.exchangeService.executeUpdates();
    }
    catch (error) {
      // TODO: show popup
    }
  }

  public async changeName(name: string): Promise<void> {
    try {
      const user = this.tokenService.getUser();
      user.name = name;
      await this.userRepository.changeName(user);
      await this.exchangeService.executeUpdates();
    }
    catch (error) {
      // TODO: show popup
    }
  }

  public async login(userId: string): Promise<void> {
    try {
      await this.userRepository.isUserExists(this.userMapper.getFromId(userId));
      await this.exchangeService.executeUpdates();
    }
    catch (error) {
      // TODO: show popup
    }
  }

  public async logout(): Promise<void> {
    await this.userRepository.logout();
    await this.exchangeService.executeUpdates();
    window.location.reload();
  }
}
