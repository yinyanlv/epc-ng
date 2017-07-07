import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {HandleErrorService} from '../../services/handle-error.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class LoginService {

  private loginUrl: string;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {

    this.loginUrl = globalConfig.get('path') + '/login';
  }

  login(params: Object): Observable<any> {

    return this.http
      .post(this.loginUrl, params, {headers: this.headers})
      .map((res) => res.json().data)
      .catch(this.handleError.handler);
  }
}
