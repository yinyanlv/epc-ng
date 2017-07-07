import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import {HandleErrorService} from '../../services/handle-error.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class CrumbsService {

  private crumbsUrl: string;

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {
    this.crumbsUrl = globalConfig.get('path') + '/crumbs/load'
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
