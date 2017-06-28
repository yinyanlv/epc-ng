import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {GlobalStateService} from './global-state.service';

@Injectable()
export class CanActivateGuardService implements CanActivate{

  constructor(
    private globalState: GlobalStateService,
    private router: Router
  ) {
  }

  canActivate(): boolean {

    if (!this.globalState.hasLogined()) {


      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
