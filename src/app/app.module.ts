import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {BaseLoginComponent} from './base-login/base-login.component';
import {JoinGameComponent} from './base-login/join-game/join-game.component';
import {CreateGameComponent} from './base-login/create-game/create-game.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {GameFieldComponent} from './game-field/game-field.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {SetSelectorPopupComponent} from './admin-panel/set-selector-popup/set-selector-popup.component';
import {GameService} from "./services/game.service";
import {UserService} from "./services/user.service";
import {GameMapper} from "./mappers/game-mapper";
import {UserMapper} from "./mappers/user-mapper";
import {GameRepository} from "./services/game-repository.service";
import {UserRepository} from "./services/user-repository.service";
import {SetRepository} from "./services/set-repository.service";
import {TokenStorageService} from "./services/token-storage.service";
import {SetItemComponent} from './admin-panel/set-selector-popup/set-item/set-item.component';
import {SetEditorComponent} from './admin-panel/set-selector-popup/set-editor/set-editor.component';
import { SetViewerPopupComponent } from './game-field/current-set/set-viewer-popup/set-viewer-popup.component';
import { CurrentSetComponent } from './game-field/current-set/current-set.component';
import { WordItemComponent } from './game-field/current-set/set-viewer-popup/word-item/word-item.component';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { TimerComponent } from './game-field/timer/timer.component';
import { UserItemComponent } from './admin-panel/user-item/user-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BaseLoginComponent,
    JoinGameComponent,
    CreateGameComponent,
    GameFieldComponent,
    AdminPanelComponent,
    SetSelectorPopupComponent,
    SetItemComponent,
    SetEditorComponent,
    SetViewerPopupComponent,
    CurrentSetComponent,
    WordItemComponent,
    UserPopupComponent,
    TimerComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule
  ],
  providers: [GameService, UserService, GameMapper, UserMapper, GameRepository, UserRepository, SetRepository, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
