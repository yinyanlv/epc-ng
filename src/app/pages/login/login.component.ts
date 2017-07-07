import {
  Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, DoCheck, HostListener, Renderer,
  AfterViewInit
} from '@angular/core';
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
export class LoginComponent implements OnInit, AfterViewInit {

  private logining: boolean = false;
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
        this.lang = this.langList[0].value;
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

  ngAfterViewInit() {

    this.usernameControl = this.loginForm.form.get('username');
    this.passwordControl = this.loginForm.form.get('password');
  }

  doValidate() {

    if (this.usernameControl.invalid) {
      this.errorInfo = 'login.validator.username';
      this.focus(this.username.nativeElement);

      return;
    }

    if (this.passwordControl.invalid) {
      this.errorInfo = 'login.validator.password';
      this.focus(this.password.nativeElement);

      return;
    }

    this.errorInfo = 'login.validator.invalid';
    this.focus(this.username.nativeElement);
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

          }
        });
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

