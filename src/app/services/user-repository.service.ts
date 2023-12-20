import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

const API_URL = environment.apiHost + 'user/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  public async logout(): Promise<void> {
    this.tokenStorage.clearStorage();
  }

  public async isUserExists(user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "isUserExists",
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant login");
    }

    this.tokenStorage.saveUser(user);
  }

  public async generateUser(name: string): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "generateUser",
      user: {id: 0, pass: '', name: name}
    }, httpOptions).toPromise();
    if(!data){
      throw new Error("Cant register");
    }

    this.tokenStorage.saveUser(data);
  }

  public async getUserInfo(): Promise<User> {
    let data = await this.http.post<any>(API_URL, {
      method: "getUserInfo",
      user: this.tokenStorage.getUser()
    }, httpOptions).toPromise();
    if(!data){
      throw new Error("Cant get user info");
    }

    return data;
  }

  public async changeName(user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "changeName",
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant get user info");
    }

    return data;
  }
}
