import {Component} from '@angular/core';
import {GameService} from "../../services/game.service";
import {SetService} from "../../services/set.service";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-current-set',
  templateUrl: './current-set.component.html',
  styleUrls: ['./current-set.component.scss']
})
export class CurrentSetComponent {
  public showSetViewer: boolean = false;
  constructor(public setService: SetService,
              private exchangeService: ExchangeService) {
    exchangeService.executeUpdates().then(() => {
      return;
    });
  }
}
