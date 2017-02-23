import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class LoginService {

  loginUrl = '/LoginMock';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
  }

  login(params) {

    return this.http
      .post(this.loginUrl, params, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  handleError(err) {
    return Promise.reject(err.message || err);
  }
}
