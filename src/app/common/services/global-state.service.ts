import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  isLogined: boolean = false;

  username: string;

  userInfo: Object = null;

  hasLogined(): boolean {

    return this.isLogined;
  }

  setAsLogined(username: string) {

    this.isLogined = true;
    this.username = username;
  }

  setUserInfo(userInfo: Object) {

    this.userInfo = userInfo;
  }

  setAsLogouted() {

    this.isLogined = false;
    this.username = null;
    this.userInfo = null;
  }
}
