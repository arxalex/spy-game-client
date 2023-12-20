import {Component, EventEmitter, Output} from '@angular/core';
import {SetService} from "../../../services/set.service";

@Component({
  selector: 'app-set-viewer-popup',
  templateUrl: './set-viewer-popup.component.html',
  styleUrls: ['./set-viewer-popup.component.scss']
})
export class SetViewerPopupComponent {
  @Output() closeEvent = new EventEmitter();
  constructor(public setService: SetService) {
  }
  public onClose(): void {
    this.closeEvent.emit();
  }
}
