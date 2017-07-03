import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {serverMap} from '../../../../config/server.conf';
import {HandleErrorService} from '../../../services/handle-error.service';

@Injectable()
export class ModelTreeService {

  private modelListUrl = serverMap.basePath + '/catalog/model/getList';

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
      .get(this.modelListUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
