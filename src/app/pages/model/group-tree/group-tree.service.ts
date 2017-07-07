import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {HandleErrorService} from '../../../services/handle-error.service';
import {GlobalConfigService} from '../../../services/global-config.service';

@Injectable()
export class GroupTreeService {

  private groupListUrl: string;

  constructor(
    private http: Http,
    private handleError: HandleErrorService,
    private globalConfig: GlobalConfigService
  ) {

    this.groupListUrl = globalConfig.get('path') + '/model/group/getList';
  }

  loadList(params: Object): Observable<any> {

    let temp = new URLSearchParams();

    Object.keys(params).forEach((key) => {

      temp.set(key, params[key]);
    });

    return this.http
      .get(this.groupListUrl, {
        search: temp
      })
      .map(res => res.json().data)
      .catch(this.handleError.handler);
  }
}
