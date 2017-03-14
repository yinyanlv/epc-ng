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

  setCrumbsList(data: Object): void {

    this.crumbsList = this.rebuildData(data);
  }

  rebuildData(data: Object): Array<any> {

    let queryParams = this.activatedRoute.snapshot.queryParams;
    let temp = [];

    Object.keys(queryParams).forEach((key) => {

      switch (key) {

        case 'brandCode':

          temp.push({
            type: 'brand',
            text: '品牌',
            code: data['brandCode'],
            name: data['brandName']
          });
          break;
        case 'seriesCode':

          temp.push({
            type: 'series',
            text: '车系',
            code: data['seriesCode'],
            name: data['seriesName']
          });
          break;
        case 'modelGroupCode':

          temp.push({
            type: 'modelGroup',
            text: '车型组',
            code: data['modelGroupCode'],
            name: data['modelGroupName']
          });
          break;
        case 'modelCode':

          temp.push({
            type: 'model',
            text: '车型',
            code: data['modelCode'],
            name: data['modelName']
          });
          break;
        default:
      }
    });

    return temp;
  }
}
