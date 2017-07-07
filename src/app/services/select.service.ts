import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {HandleErrorService} from './handle-error.service';
import {GlobalConfigService} from './global-config.service';

@Injectable()
export class SelectService {

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {
  }

  load(selectName: string = ''): Observable<any> {

    if (selectName === '') return;

    let url = this.globalConfig.get('path') + '/select/load/' + selectName;

    return this.http
      .get(url)
      .map((res) => res.json().data)
      .catch(this.handleError.handler);
  }
}
