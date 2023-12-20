import { Component } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {
  constructor(private gameService: GameService) {
  }
  public async createGame() {
    await this.gameService.createGame();
  }
}
