import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {GlobalStateService} from '../../services/global-state.service';
import {GlobalConfigService} from '../../services/global-config.service';
import {HandleErrorService} from '../../services/handle-error.service';

@Injectable()
export class NavigationService {

  private userInfoUrl: string;

  constructor(
    private http: Http,
    private globalState: GlobalStateService,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ){

    this.userInfoUrl = globalConfig.get('path') + '/userInfo';
  }

  loadUserInfo(username: string): Observable<any>{

    if (!username) {
      Observable.throw('username is empty, when load user info!');
    }

    return this.http
      .get(this.userInfoUrl + '?username=' + this.globalState.getUserName())
      .map((res) => JSON.parse(res.json().data))
      .catch(this.handleError.handler);
  }
}
