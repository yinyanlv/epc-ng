import {Component, ViewChild} from '@angular/core';

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

  isShowError = false;
  errorInfo = '出现未知错误';
  loginBtnText = '登录';

  constructor(private loginService: LoginService) {
  }

  login() {

    if (this.validate()) {

      this.loginBtnText = '登录中...';

      let params = this.getParams();

      this.loginService
        .login(params)
        .then((res) => {
          console.log(res);

          this.loginBtnText = '登录';
        });
    }
  }

  validate() {

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

