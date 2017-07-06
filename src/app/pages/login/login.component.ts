import {Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, DoCheck, HostListener} from '@angular/core';
import {Router} from '@angular/router';

import {TranslateService} from 'ng2-translate';

import {LoginService} from './login.service';
import {SelectService} from '../../services/select.service';
import {GlobalStateService} from '../../services/global-state.service';


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

  @ViewChild('loginForm') loginForm;
  @ViewChild('username') username;
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

  ngDoCheck() {

    this.lang = this.globalState.getLanguage();
  }

  @HostListener('keyup.enter')
  login(): void {

    if (this.logining) return;

    if (this.loginForm.form.valid) {

      this.logining = true;
      this.loginBtnText = 'login.validator.logining';

      let params = this.getParams();

      this.loginService
        .login(params)
        .subscribe((res) => {

          this.loginBtnText = 'login.validator.login';
          this.logining = false;

          this.globalState.setAsLogined(params.username);

          if (res.success) {

            this.router.navigate(['/catalog']);

          } else {

            this.errorInfo = 'login.validator.invalid';
            this.username.nativeElement.focus();
          }
        });
    } else {

      this.showError();
    }
  }

  showError(): void {

    if (this.username.form.invalid) {
      this.errorInfo = 'login.validator.username';
      this.username.nativeElement.focus();
    }

    if (this.password.form.invalid) {
      this.errorInfo = 'login.validator.password';
      this.password.nativeElement.focus();
    }
  }

  getParams() {

    return this.loginForm.value;
  }

  onChangeLang() {

    let lang = this.lang;

    this.translateService.use(lang);
    this.globalState.setLanguage(lang);
  }
}

