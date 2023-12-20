import { Component } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  public gameIdInput: string = "";
  constructor(private gameService: GameService) {
    this.gameIdInput = gameService.getGameId;
  }
  public async joinGame() {
    await this.gameService.joinGame(this.gameIdInput);
  }
}
