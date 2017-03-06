import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {serverMap} from '../../config/server-config';

@Injectable()
export class SelectService {

  constructor(private http: Http) {
  }

  load(selectName: string = '') {

    if (selectName === '') return;

    let url = serverMap.basePath + '/select/' + selectName;

    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {

    return Promise.reject(err.message || err);
  }
}
