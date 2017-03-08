import {Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {LoginService} from './login.service';
import {SelectService} from '../../common/services/select.service';
import {GlobalStateService} from '../../common/services/global-state.service';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('account') account;
  @ViewChild('password') password;
  @ViewChild('lang') lang;
  @ViewChild('database') database;

  private isShowError: boolean = false;
  private errorInfo: string = '出现未知错误';
  private loginBtnText: string = '登录';
  private logining: boolean = false;
  private langList;
  private databaseList;

  constructor(
    private el: ElementRef,
    private router: Router,
    private loginService: LoginService,
    private selectService: SelectService,
    private globalState: GlobalStateService
  ) {
  }

  ngOnInit() {

    this.selectService
      .load('lang')
      .subscribe((res) => {
        this.langList = res;
      });

    this.selectService
      .load('database')
      .subscribe((res) => {
        this.databaseList = res;
      });
  }

  ngAfterViewInit() {

  }

  login(): void {

    if (this.logining) return;

    if (this.validate()) {

      this.logining = true;
      this.loginBtnText = '登录中...';

      let params = this.getParams();

      this.loginService
        .login(params)
        .subscribe((res) => {

          this.loginBtnText = '登录';
          this.logining = false;

          this.globalState.isLogined = true;

          if (res.success) {

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

