import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {TranslateService} from 'ng2-translate';

import {GlobalStateService} from '../../services/global-state.service';
import {NavigationService} from './navigation.service';

@Component({
  selector: 'navigation',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'navigation.html',
  styleUrls: ['navigation.scss']
})
export class NavigationComponent implements OnInit {

  public userInfo: any;

  constructor(
    private globalState: GlobalStateService,
    private navigation: NavigationService,
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {

    this.navigation
      .loadUserInfo(this.globalState.getUserName())
      .subscribe((res) => {

        this.globalState.setUserInfo(res);
        this.userInfo = res;
      });

    this.setLanguage(this.globalState.getLanguage());
  }

  setLanguage(lang: string): void {

    this.translateService.use(lang);
    this.globalState.setLanguage(lang);
  }

  logout(): void {

    this.globalState.setAsLogouted();
    this.router.navigate(['login']);
  }
}
