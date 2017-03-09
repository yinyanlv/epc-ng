import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  isLogined: boolean = false;

  username: string;

  userInfo: Object = null;
}
