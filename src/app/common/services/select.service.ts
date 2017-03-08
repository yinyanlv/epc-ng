import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {serverMap} from '../../config/server-config';

@Injectable()
export class SelectService {

  constructor(private http: Http) {
  }

  load(selectName: string = '') {

    if (selectName === '') return;

    let url = serverMap.basePath + '/select/load/' + selectName;

    return this.http
      .get(url)
      .map((res) => res.json().data)
      .catch(this.handleError);
  }

  private handleError(err: any): Observable<any> {

    let errMsg = err.message || err;

    return Observable.throw(errMsg);
  }
}
