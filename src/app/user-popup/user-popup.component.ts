import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../services/user.service";
import {ExchangeService} from "../services/exchange.service";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent {
  @Output() closeEvent = new EventEmitter();
  public form: any = {
    name: null
  };
  public loginForm: any = {
    userId: null
  };
  public isSaveFailed = false;
  public errorMessage = '';
  public isLoginFailed = false;
  public errorMessageLogin = '';
  public loginFormVisible: boolean = false;
  public formVisible: boolean = false;

  public get nameFormVisible(): boolean {
    return this.formVisible || !this.userService.isLoggedIn;
  }

  public get loginButtonVisible(): boolean {
    return !this.loginFormVisible;
  }

  constructor(public userService: UserService,
              private exchangeService: ExchangeService,
              private clipboard: Clipboard) {
  }

  public onClose(): void {
    this.closeEvent.emit();
  }

  public async onSubmit(): Promise<void> {
    try {
      const {name} = this.form;
      if (!this.userService.isLoggedIn) {
        await this.userService.register(name);
        await this.exchangeService.afterPopupSubmit();
      } else {
        await this.userService.changeName(name);
      }

      this.isSaveFailed = false;
      this.errorMessage = "";
      this.closeEvent.emit();
    } catch (err: any) {
      this.isSaveFailed = true;
      this.errorMessage = err;
    }
  }

  public async onLoginSubmit(): Promise<void> {
    try {
      const {userId} = this.loginForm;
      await this.userService.login(userId);
      await this.exchangeService.afterPopupSubmit();

      this.isLoginFailed = false;
      this.errorMessageLogin = "";
      this.closeEvent.emit();
    } catch (err: any) {
      this.isLoginFailed = true;
      this.errorMessageLogin = err;
    }
  }

  public copyToClipboard(): void {
    this.clipboard.copy(this.userService.userID);
  }

  public showLoginForm(): void {
    this.loginFormVisible = true;
    this.formVisible = false;
  }
}
