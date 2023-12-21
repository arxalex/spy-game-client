import {Component, Input} from '@angular/core';
import {User} from "../../models/user";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() userItem!: User;
  constructor(public gameService: GameService) {
  }
}
