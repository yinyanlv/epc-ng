import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {serverMap} from '../../config/server-config';
import {HandleErrorService} from '../../common/services/handle-error.service';

@Injectable()
export class LoginService {

  private loginUrl = serverMap.basePath + '/login';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  login(params: Object): Observable<any> {

    return this.http
      .post(this.loginUrl, params, {headers: this.headers})
      .map((res) => res.json().data)
      .catch(this.handleError.handler);
  }
}
