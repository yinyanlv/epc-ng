import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {serverMap} from '../../config/server.conf';
import {HandleErrorService} from './handle-error.service';

@Injectable()
export class SelectService {

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  load(selectName: string = ''): Observable<any> {

    if (selectName === '') return;

    let url = serverMap.basePath + '/select/load/' + selectName;

    return this.http
      .get(url)
      .map((res) => res.json().data)
      .catch(this.handleError.handler);
  }
}
