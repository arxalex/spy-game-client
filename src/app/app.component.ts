import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "./services/user.service";
import {GameService} from "./services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public gameService: GameService
    ) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      let gameId: string = params['game'];
      if(gameId != null && gameId.length > 0){
        this.gameService.joinGame(gameId);
      }
    });
  }
}
