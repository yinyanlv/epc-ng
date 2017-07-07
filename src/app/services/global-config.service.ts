import {Injectable} from '@angular/core';

@Injectable()
export class GlobalConfigService {

  private globalConfig: any;

  constructor() {

    this.globalConfig = window['globalConfig'];
  }

  set(key: string, value: any) {

    this.globalConfig[key] = value;
  }

  get(key: string) {

    return this.globalConfig[key];
  }
}
