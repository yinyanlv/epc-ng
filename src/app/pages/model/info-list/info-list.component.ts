import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {InfoListService} from './info-list.service';

@Component({
  selector: 'info-list',
  templateUrl: './info-list.html',
  providers: [
    InfoListService
  ]
})
export class InfoListComponent {

  private modelList: Array<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoListService: InfoListService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.infoListService
        .loadList(params)
        .subscribe((res) => {
          this.setModelTree(res);
        });
    });
  }

  setModelTree(data: Array<Object>): void {

    this.modelList = data;
  }
}
