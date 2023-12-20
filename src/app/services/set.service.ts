import {Injectable} from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {SetRepository} from "./set-repository.service";
import {Set} from "../models/set";
import {ExchangeService} from "./exchange.service";
import {SetWordsRepositoryModel} from "../models/set-words-repository-model";
import {Word} from "../models/word";


@Injectable({
  providedIn: 'root'
})
export class SetService {
  private sets: Set[] = [];
  private setAndWords: SetWordsRepositoryModel = {set: {id: 0, name: "", userid: 0}, words: []};
  private updateSetServiceFunction: () => Promise<void> = async (): Promise<void> => {
    await this.checkSet();
    if(this.exchangeService.adminMode) {
      await this.checkSetList();
    }
  };

  constructor(
    private setRepository: SetRepository,
    private tokenStorage: TokenStorageService,
    private exchangeService: ExchangeService
  ) {
    exchangeService.setSetServiceFunction(this.updateSetServiceFunction);
    this.updateSetServiceFunction().then(r => {
    });
  }

  public get mySetList(): Set[] {
    const user = this.tokenStorage.getUser();
    return this.sets.filter(e => e.userid === user.id);
  }

  public get publicSetList(): Set[] {
    return this.sets.filter(e => e.userid === 0 && e.id !== 0);
  }

  public get set(): Set {
    return this.setAndWords.set;
  }

  public get words(): Word[] {
    return this.setAndWords.words;
  }

  public async checkSetList(): Promise<void> {
    try {
      this.sets = [...await this.setRepository.getList(this.tokenStorage.getUser()), ...await this.setRepository.getListPublic(this.tokenStorage.getUser())];
    } catch (e) {
      // TODO: show popup
    }
  }

  public async checkSet(): Promise<void> {
    const setId = this.exchangeService.setId;
    if (!!setId) {
      try {
        this.setAndWords = await this.setRepository.getSet(setId);
      } catch (e) {
        // TODO: show popup
      }
    } else {
      this.setAndWords = {set: {id: 0, name: "", userid: 0}, words: []};
    }
  }

  public async updateSet(setId: number, name: string, words: string[]): Promise<void> {
    const user = this.tokenStorage.getUser();
    try {
      const setAndWords = await this.setRepository.getSet(setId);
      const set = setAndWords.set;
      set.name = name;
      const wordsArray: Word[] = words.map((word, key) => {
        return {
          id: setAndWords.words.length > key ? setAndWords.words[key].id : null,
          setid: setId,
          word: word
        }
      });

      await this.setRepository.updateSet(set, wordsArray, user);
      await this.exchangeService.executeUpdates();
    } catch (e) {
      // TODO: show popup
      throw e;
    }
  }

  public async createSet(name: string, words: string[]): Promise<void> {
    const user = this.tokenStorage.getUser();
    try {
      const set = await this.setRepository.createSet(name, user);
      const wordsArray: Word[] = words.map(word => {
        return {id: null, setid: set.id, word: word}
      });
      await this.setRepository.updateSet(set, wordsArray, user);
      await this.exchangeService.executeUpdates();
    } catch (e) {
      // TODO: show popup
      throw e;
    }
  }

  public async getSet(id: number): Promise<SetWordsRepositoryModel> {
    try {
      return await this.setRepository.getSet(id);
    } catch (e) {
      // TODO: show popup
      throw e;
    }
  }

  public async deleteSet(id:number): Promise<void> {
    const user = this.tokenStorage.getUser();
    try {
      const set = await this.setRepository.deleteSet(id, user);
      await this.exchangeService.executeUpdates();
    } catch (e) {
      // TODO: show popup
    }
  }
}
