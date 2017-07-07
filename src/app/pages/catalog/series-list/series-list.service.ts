import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {HandleErrorService} from '../../../services/handle-error.service';
import {GlobalConfigService} from '../../../services/global-config.service';

@Injectable()
export class SeriesListService {

  private seriesListUrl: string;

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {

    this.seriesListUrl = globalConfig.get('path') + '/catalog/series/getList';
  }

  loadList(): Observable<any> {

    return this.http
      .get(this.seriesListUrl)
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
