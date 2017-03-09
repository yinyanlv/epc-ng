import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {serverMap} from '../../../config/server-config';
import {GlobalStateService} from '../../services/global-state.service';

@Injectable()
export class NavigationService {

  private userInfoUrl = serverMap.basePath + '/userInfo';

  constructor(
    private http: Http,
    private globalState: GlobalStateService
  ){
  }

  loadUserInfo(username: string): Observable<any>{

    if (!username) {
      Observable.throw('username is empty, when load user info!');
    }

    return this.http
      .get(this.userInfoUrl + '?username=' + this.globalState.username)
      .map((res) => JSON.parse(res.json().data))
      .catch(this.handleError);
  }

  private handleError(err: any): Observable<any> {

    let errMsg = err.message || err;

    return Observable.throw(errMsg);
  }
}
