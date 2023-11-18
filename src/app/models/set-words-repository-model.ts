import {Set} from "./set";
import {Word} from "./word";

export interface SetWordsRepositoryModel {
  set: Set;
  words: Array<Word>;
}
