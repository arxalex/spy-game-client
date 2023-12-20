import {Component, EventEmitter, Output} from '@angular/core';
import {GameService} from "../../services/game.service";
import {SetService} from "../../services/set.service";
import {Game} from "../../models/game";

@Component({
  selector: 'app-set-selector-popup',
  templateUrl: './set-selector-popup.component.html',
  styleUrls: ['./set-selector-popup.component.scss']
})
export class SetSelectorPopupComponent {
  @Output() closeEvent = new EventEmitter();
  public showSetEditorPopup: boolean = false;
  public setId: number | undefined;

  constructor(public setService: SetService,
              private gameService: GameService) {
  }

  public onClose(): void {
    this.closeEvent.emit();
  }

  public createSet(): void {
    this.setId = undefined;
    this.showSetEditorPopup = true;
  }

  public async onItemSelect(id: number): Promise<void> {
    await this.gameService.setSet(id);
  }

  public async onItemDelete(id: number): Promise<void> {
    await this.setService.deleteSet(id);
  }

  public onItemEdit(id: number): void {
    this.setId = id;
    this.showSetEditorPopup = true;
  }
}
