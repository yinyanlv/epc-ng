import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CrumbsService} from './crumbs.service';

@Component({
  selector: 'crumbs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './crumbs.html',
  styleUrls: ['./crumbs.scss'],
  providers: [
    CrumbsService
  ]
})
export class CrumbsComponent implements OnInit {

  private crumbsList: Array<any> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crumbsService: CrumbsService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.crumbsService
        .load(params)
        .subscribe((res) => {
          this.setCrumbsList(res);
        });
    });
  }

  setCrumbsList(data: Array<any>): void {

    this.crumbsList = this.rebuildData(data);

  }

  rebuildData(data: Array<any>): Array<any> {

    let queryParams = this.activatedRoute.snapshot.queryParams;
    let temp = [];

    Object.keys(queryParams).forEach((key) => {

      switch (key) {

        case 'brandCode':

          temp.push({
            text: '品牌',
            code: data[0].code,
            name: data[0].name
          });
          break;
        case 'seriesCode':

          temp.push({
            text: '车系',
            code: data[0].series[0].code,
            name: data[0].series[0].name
          });
          break;
        case 'modelGroupCode':

          temp.push({
            text: '车型组',
            code: data[0].series[0].modelGroups[0].code,
            name: data[0].series[0].modelGroups[0].name
          });
          break;
        case 'modelCode':

          temp.push({
            text: '车型',
            code: data[0].series[0].modelGroups[0].models[0].code,
            name: data[0].series[0].modelGroups[0].models[0].name
          });
          break;
        default:
      }
    });

    return temp;
  }
}
