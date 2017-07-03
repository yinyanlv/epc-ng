import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import {serverMap} from '../../../config/server.conf';
import {HandleErrorService} from '../../services/handle-error.service';

@Injectable()
export class CrumbsService {

  private crumbsUrl = serverMap.basePath + '/crumbs/load';

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  load(params: Object) {

    let temp = new URLSearchParams();

    Object.keys(params).forEach((key) => {

      temp.set(key, params[key]);
    });

    return this.http
      .get(this.crumbsUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
