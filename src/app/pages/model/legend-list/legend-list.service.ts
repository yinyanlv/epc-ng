import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {serverMap} from '../../../config/server-config';
import {HandleErrorService} from '../../../common/services/handle-error.service';

@Injectable()
export class LegendListService {

  private seriesListUrl = serverMap.basePath + '/catalog/series/getList';

  constructor(
    private http: Http,
    private handleError: HandleErrorService
  ) {
  }

  loadList(): Observable<any> {

    return this.http
      .get(this.seriesListUrl)
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
