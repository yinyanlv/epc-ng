import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import {HandleErrorService} from '../../services/handle-error.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class QueryService {

  private queryUrl: string;

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {

    this.queryUrl = globalConfig.get('path') + '/query/load';
  }

  load(type: string, params: Object) {

    let selectorUrl = this.globalConfig.get('path') + '/select/loadWithQuery/' + type;
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
