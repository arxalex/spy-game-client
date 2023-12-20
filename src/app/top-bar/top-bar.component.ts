import {Component} from '@angular/core';
import {ExchangeService} from "../services/exchange.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  public userPopupVisible: boolean = false;
  private showUserPopupFun: () => void = (): void => {
    this.userPopupVisible = true;
  }

  constructor(private exChangeService: ExchangeService) {
    exChangeService.setShowUserPopup(this.showUserPopupFun);
  }
}
