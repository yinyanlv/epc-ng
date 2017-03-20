import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  setAsLogined(username: string): void {

    localStorage.setItem('isLogined', 'true');
    localStorage.setItem('username', username);
  }

  getUserName(): string {

    return localStorage.getItem('username');
  }

  hasLogined(): boolean {

    return localStorage.getItem('isLogined') === 'true';
  }

  setUserInfo(userInfo: Object): void {

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  setAsLogouted(): void {

    localStorage.setItem('isLogined', 'false');
    localStorage.setItem('username', '');
    localStorage.setItem('userInfo', '');
  }

  setLanguage(lang: string): void {

    localStorage.setItem('language', lang);
  }

  getLanguage(): string {

    return localStorage.getItem('language') !== 'undefined' ? localStorage.getItem('language') : 'zh';
  }
}
