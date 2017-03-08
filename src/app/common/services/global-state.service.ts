import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  private _isLogined = false;

  get isLogined(): boolean {
    return this._isLogined;
  }

  set isLogined(val: boolean) {
    this._isLogined = val;
  }
}
