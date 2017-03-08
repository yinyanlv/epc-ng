import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {GlobalStateService} from './global-state.service';

@Injectable()
export class CanActivateGuardService implements CanActivate{

  constructor(
    private globalState: GlobalStateService
  ) {
  }

  canActivate(): boolean {
    return this.globalState.isLogined;
  }
}
