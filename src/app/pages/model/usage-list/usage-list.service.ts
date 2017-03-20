import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {serverMap} from '../../../config/server-config';
import {HandleErrorService} from '../../../common/services/handle-error.service';

@Injectable()
export class UsageListService {

  private usageListUrl = serverMap.basePath + '/model/usage/getList';

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  loadList(params: Object): Observable<any> {

    let temp = new URLSearchParams();

    Object.keys(params).forEach((key) => {

      temp.set(key, params[key]);
    });

    return this.http
      .get(this.usageListUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}