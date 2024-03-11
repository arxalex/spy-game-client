import {Component} from '@angular/core';
import {GameService} from "../services/game.service";
import {SetService} from "../services/set.service";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  public showSetPopup: boolean = false;

  constructor(public gameService: GameService,
              public setService: SetService,
              private clipboard: Clipboard) {
  }

  public copyToClipboard(): void {
    const gameLink = "https://apps.arxalex.com/spy?game=" + this.gameService.getGameId;
    this.clipboard.copy(gameLink);
  }
}
