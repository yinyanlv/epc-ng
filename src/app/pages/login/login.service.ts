import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class LoginService {

  private loginUrl = '/app/users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
  }

  login(params: Object): Promise<any> {

    return this.http
      .post(this.loginUrl, params, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {

    return Promise.reject(err.message || err);
  }
}
