import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HandleErrorService {

  handler(err: any): Observable<any> {

    let errMsg = err.message || err;

    return Observable.throw(errMsg);
  }
}

