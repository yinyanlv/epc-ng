import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, HostListener, Renderer, AfterViewChecked } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

import {TranslateService} from 'ng2-translate';

import {LoginService} from './login.service';
import {SelectService} from '../../services/select.service';
import {GlobalStateService} from '../../services/global-state.service';


@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewChecked {

  private logining: boolean = false;
  isShowError: boolean;
  errorInfo: string;
  loginBtnText: string;
  lang: string;
  database: string;
  langList: Array<any>;
  databaseList: Array<any>;
  usernameControl: FormControl;
  passwordControl: FormControl;

  @ViewChild('loginForm') loginForm;
  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(
    private router: Router,
    private renderer: Renderer,
    private loginService: LoginService,
    private selectService: SelectService,
    private globalState: GlobalStateService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {

    this.selectService
      .load('lang')
      .subscribe((res) => {
        this.langList = res;
        this.lang = this.langList[1].value;
      });

    this.selectService
      .load('database')
      .subscribe((res) => {
        this.databaseList = res;
        this.database = this.databaseList[0].value;
      });

    this.loginBtnText = 'login.validator.login';
    this.errorInfo = 'login.validator.unknown';
  }

  ngAfterViewChecked() {

    if (!this.usernameControl) {
      this.usernameControl = this.loginForm.form.get('username');
    }

    if (!this.passwordControl) {
      this.passwordControl = this.loginForm.form.get('password');
    }
  }

  @HostListener('keyup')
  doValidate() {

    if (this.usernameControl.invalid) {
      this.isShowError = true;
      this.focus(this.username.nativeElement);
      this.errorInfo = 'login.validator.username';

      return;
    }

    if (this.passwordControl.invalid) {
      this.isShowError = true;

      this.focus(this.password.nativeElement);
      this.errorInfo = 'login.validator.password';

      return;
    }

    this.isShowError = false;
  }

  @HostListener('keyup.enter')
  login(): void {

    if (this.logining) return;

    if (this.loginForm.form.valid) {

      this.logining = true;
      this.loginBtnText = 'login.validator.logining';

      let params = this.loginForm.value;

      this.loginService
        .login(params)
        .subscribe((res) => {

          this.loginBtnText = 'login.validator.login';
          this.logining = false;

          this.globalState.setAsLogined(params.username);

          if (res.success) {

            this.router.navigate(['/catalog']);

          } else {

            this.isShowError = true;
            this.errorInfo = 'login.validator.invalid';
            this.focus(this.username.nativeElement);
          }
        });
    } else {
      this.doValidate();
    }
  }

  focus(el: ElementRef): void {

    this.renderer.invokeElementMethod(el, 'focus');
  }

  onChangeLang() {

    let lang = this.lang;

    this.translateService.use(lang);
    this.globalState.setLanguage(lang);
  }
}

