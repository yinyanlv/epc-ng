import {Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

import {TranslateService} from 'ng2-translate';

import {LoginService} from './login.service';
import {SelectService} from '../../services/select.service';
import {GlobalStateService} from '../../services/global-state.service';

const langMap = {
  zh: {
    login: '登录',
    logining: '登录中...',
    errorList: [
      '未知错误',
      '帐号为必填项',
      '密码为必填项',
      '用户名或密码错误'
    ]
  },
  en: {
    login: 'login',
    logining: 'logining...',
    errorList: [
     'unknown error',
     'username is required',
     'password is required',
     'username or password is error'
   ]
 }
};

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, DoCheck {

  public isShowError: boolean = false;
  private logining: boolean = false;
  public errorInfo: string;
  public loginBtnText: string;
  public lang: string;
  public database: string;
  public langList;
  public databaseList;

  @ViewChild('account') account;
  @ViewChild('password') password;

  constructor(
    private el: ElementRef,
    private router: Router,
    private loginService: LoginService,
    private selectService: SelectService,
    private globalState: GlobalStateService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {

    let lang = this.globalState.getLanguage();

    this.errorInfo = langMap[lang].errorList[0];
    this.loginBtnText = langMap[lang].login;

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
  }

  ngDoCheck() {

    this.lang = this.globalState.getLanguage();
  }

  login(): void {

    if (this.logining) return;

    let lang = this.globalState.getLanguage();

    if (this.validate()) {

      this.logining = true;
      this.loginBtnText = langMap[lang].logining;

      let params = this.getParams();

      this.loginService
        .login(params)
        .subscribe((res) => {

          this.loginBtnText = langMap[lang].login;
          this.logining = false;

          this.globalState.setAsLogined(params.username);

          if (res.success) {

            this.router.navigate(['/catalog']);

          } else {

            this.isShowError = true;
            this.errorInfo = langMap[lang].errorList[3];
            this.account.nativeElement.focus();
          }
        });
    }
  }

  validate(): boolean {

    let lang = this.globalState.getLanguage();

    this.isShowError = false;

    if (this.account.nativeElement.value.trim() === '') {

      this.isShowError = true;
      this.errorInfo = langMap[lang].errorList[1];
      this.account.nativeElement.focus();

      return false;
    }

    if (this.password.nativeElement.value.trim() === '') {

      this.isShowError = true;
      this.errorInfo = langMap[lang].errorList[2];
      this.password.nativeElement.focus();

      return false;
    }

    return true;
  }

  getParams() {

    return {
      username: this.account.nativeElement.value,
      password: this.password.nativeElement.value,
      lang: this.lang,
      database: this.database
    };
  }

  onChangeLang() {

    let lang = this.lang;

    this.translateService.use(lang);
    this.globalState.setLanguage(lang);
    this.loginBtnText = langMap[lang].login;
  }
}

