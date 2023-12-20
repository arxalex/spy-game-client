import {Component} from '@angular/core';
import {SetService} from "../services/set.service";
import {GameService} from "../services/game.service";
import {ExchangeService} from "../services/exchange.service";

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent {
  public get currentWord(): string {
    if(!this.gameService.isGameStarted){
      return "";
    }
    const wordId = this.gameService.currentWord;
    if (wordId) {
      return this.setService.words.filter(e => e.id === wordId)[0].word
    } else {
      return "";
    }
  }

  constructor(public gameService: GameService,
              public setService: SetService) {
  }
}
