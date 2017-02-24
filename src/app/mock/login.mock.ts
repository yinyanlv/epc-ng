import {InMemoryDbService} from 'angular-in-memory-web-api';

export class LoginMock implements InMemoryDbService{

  createDb() {

    let users = [{
      username: 'admin',
      password: '111111'
    }];

    return {users};
  }
}
