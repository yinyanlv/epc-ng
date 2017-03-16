import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import {serverMap} from '../../../config/server-config';
import {HandleErrorService} from '../../services/handle-error.service';

@Injectable()
export class QueryService {

  private queryUrl = serverMap.basePath + '/query/load';

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  load(type: string, params: Object) {

    let selectorUrl = serverMap.basePath + '/select/loadWithQuery/' + type;
    let temp = new URLSearchParams();

    Object.keys(params).forEach((key) => {

      temp.set(key, params[key]);
    });

    return this.http
      .get(selectorUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }

  query(params: Object) {

    let temp = new URLSearchParams();

    Object.keys(params).forEach((key) => {

      temp.set(key, params[key]);
    });

    return this.http
      .get(this.queryUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
