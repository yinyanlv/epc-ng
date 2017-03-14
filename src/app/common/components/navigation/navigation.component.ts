import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalStateService} from '../../services/global-state.service';
import {NavigationService} from './navigation.service';

@Component({
  selector: 'navigation',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class NavigationComponent implements OnInit {

  private userInfo: Object;

  constructor(
    private globalState: GlobalStateService,
    private navigation: NavigationService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.navigation
      .loadUserInfo(this.globalState.username)
      .subscribe((res) => {

        this.globalState.setUserInfo(res);
        this.userInfo = res;
      });
  }

  logout(): void {

    this.globalState.setAsLogouted();
    this.router.navigate(['login']);
  }
}
