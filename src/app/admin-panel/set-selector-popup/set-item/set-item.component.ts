import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Set} from "../../../models/set";
import {TokenStorageService} from "../../../services/token-storage.service";
import {SetService} from "../../../services/set.service";

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.scss']
})
export class SetItemComponent {
  @Input() public setItem: Set = {id: 0, name: "", userid: 0};
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  public get isMySet(): boolean {
    return this.setItem.userid === this.tokenStorage.getUser().id;
  }

  public get isSetSelected(): boolean {
    return this.setItem.id === this.setService.set.id;
  }

  constructor(private tokenStorage: TokenStorageService,
              private setService: SetService) {

  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }

  public onEdit(): void {
    this.editEvent.emit();
  }

  public onSelect(): void {
    this.selectEvent.emit();
  }
}
