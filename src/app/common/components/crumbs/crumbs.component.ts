import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CrumbsService} from './crumbs.service';

@Component({
  moduleId: module.id,
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
  private originalCrumbsData: Object;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crumbsService: CrumbsService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      params = JSON.parse(JSON.stringify(params));

      if (params['nodeCode']) delete params['nodeCode'];
      if (params['callout']) delete params['callout'];

      this.crumbsService
        .load(params)
        .subscribe((res) => {
          this.setCrumbsList(res);
        });
    });
  }

  setCrumbsList(data: Object): void {

    this.originalCrumbsData = data;
    this.crumbsList = this.rebuildData(data);
  }

  rebuildData(data: Object): Array<any> {

    let queryParams = this.activatedRoute.snapshot.queryParams;
    let temp = [];

    if (!data) return temp;

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

  onClickItem(data: any): void {

    let urlPrefix = '/catalog';
    let queryParams = {};

    if (this.originalCrumbsData) {

      switch(data.type) {

        case 'brand':

          queryParams['brandCode'] = this.originalCrumbsData['brandCode'];
          break;
        case 'series':

          queryParams['brandCode'] = this.originalCrumbsData['brandCode'];
          queryParams['seriesCode'] = this.originalCrumbsData['seriesCode'];
          break;
        case 'modelGroup':

          urlPrefix = '/model';
          queryParams['brandCode'] = this.originalCrumbsData['brandCode'];
          queryParams['seriesCode'] = this.originalCrumbsData['seriesCode'];
          queryParams['modelGroupCode'] = this.originalCrumbsData['modelGroupCode'];
          break;
        case 'model':

          urlPrefix = '/model';
          queryParams['brandCode'] = this.originalCrumbsData['brandCode'];
          queryParams['seriesCode'] = this.originalCrumbsData['seriesCode'];
          queryParams['modelGroupCode'] = this.originalCrumbsData['modelGroupCode'];
          queryParams['modelCode'] = this.originalCrumbsData['modelCode'];
          break;
        default:
      }
    }

    this.setUrl(urlPrefix, queryParams);
  }

  setUrl(urlPrefix: string, queryParams: Object): void {

    this.router.navigate([urlPrefix], {
      queryParams: queryParams
    });
  }
}
