import {Component, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {LoginService} from './login.service';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  @ViewChild('account') account;
  @ViewChild('password') password;
  @ViewChild('lang') lang;
  @ViewChild('database') database;

  private isShowError: boolean = false;
  private errorInfo: string = '出现未知错误';
  private loginBtnText: string = '登录';

  constructor(
    private el: ElementRef,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {


    console.log($(this.el.nativeElement));
  }

  login(): void {

    if (this.validate()) {

      this.loginBtnText = '登录中...';

      let params = this.getParams();

      this.loginService
        .login(params)
        .then((res) => {

          this.loginBtnText = '登录';

          if (res.username === 'admin' && res.password === '111111') {

            this.router.navigate(['catalog']);

          } else {

            this.isShowError = true;
            this.errorInfo = '用户名或密码错误';
            this.account.nativeElement.focus();
          }
        });
    }
  }

  validate(): boolean {

    this.isShowError = false;

    if (this.account.nativeElement.value.trim() === '') {

      this.isShowError = true;
      this.errorInfo = '帐号为必填项';
      this.account.nativeElement.focus();

      return false;
    }

    if (this.password.nativeElement.value.trim() === '') {

      this.isShowError = true;
      this.errorInfo = '密码为必填项';
      this.password.nativeElement.focus();

      return false;
    }

    return true;
  }

  getParams() {

    return {
      username: this.account.nativeElement.value,
      password: this.password.nativeElement.value
    };
  }
}

