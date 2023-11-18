import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let gameId: string = params['game'];
      if(gameId != null && gameId.length > 0){
        //this.loginService.JoinGame(gameId);
      }
    });
  }
}
