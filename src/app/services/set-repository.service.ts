import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Set} from "../models/set";
import {SetWordsRepositoryModel} from "../models/set-words-repository-model";
import {User} from "../models/user";
import {Word} from "../models/word";


const API_URL = environment.apiHost + 'set/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class SetRepository {

  constructor(private http: HttpClient) {
  }

  public async getSet(setId: number): Promise<SetWordsRepositoryModel> {
    let data = await this.http.post<any>(API_URL, {
      method: "getSet",
      set: {id: setId}
    }, httpOptions).toPromise();
    if (!data) {
      throw new Error("Cant get set");
    }

    return data;
  }

  public async createSet(setName: string, user: User): Promise<Set> {
    let data = await this.http.post<any>(API_URL, {
      method: "createSet",
      set: {name: setName},
      user: user
    }, httpOptions).toPromise();
    if (!data) {
      throw new Error("Cant create set");
    }

    return data;
  }

  public async updateSet(set: Set, words: Array<Word>, user: User): Promise<SetWordsRepositoryModel> {
    let data = await this.http.post<any>(API_URL, {
      method: "updateSet",
      set: set,
      words: words,
      user: user
    }, httpOptions).toPromise();
    if (!data) {
      throw new Error("Cant update set");
    }

    return data;
  }

  public async deleteSet(setId: number, user: User): Promise<void> {
    let data = await this.http.post<any>(API_URL, {
      method: "deleteSet",
      set: {id: setId},
      user: user
    }, httpOptions).toPromise();
    if (!data || !Boolean(data)) {
      throw new Error("Cant delete set");
    }
  }
}
