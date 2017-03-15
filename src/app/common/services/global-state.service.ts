import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  isLogined: boolean = false;

  username: string;

  userInfo: Object = null;

  language: string = 'zh';

  hasLogined(): boolean {

    return this.isLogined;
  }

  setAsLogined(username: string): void {

    this.isLogined = true;
    this.username = username;
  }

  setUserInfo(userInfo: Object): void {

    this.userInfo = userInfo;
  }

  setAsLogouted(): void {

    this.isLogined = false;
    this.username = null;
    this.userInfo = null;
  }

  setLanguage(lang: string): void {

    this.language = lang;
  }

  getLanguage(): string {

    return this.language;
  }
}
