import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LegendListService} from './legend-list.service';

@Component({
  selector: 'legend-list',
  templateUrl: './legend-list.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    LegendListService
  ]
})
export class LegendListComponent implements OnInit {

  private seriesList: Array<Object> = null;
  private activeBrandCode: string;
  private activeSeriesCode: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private legendListService: LegendListService
  ) {
  }

  ngOnInit() {

    this.legendListService
      .loadList()
      .subscribe(res => this.setSeriesList(res));

    this.activatedRoute.queryParams.subscribe((params) => {

      if (!params['brandCode']) {

        if (this.seriesList) {  // 不带任何参数跳转时，默认显示第一个品牌的第一个车系

            this.setQueryString(this.seriesList[0]['brandCode'], this.seriesList[0]['series'][0]['seriesCode']);
        }

        return;
      } else if (!params['seriesCode']) {  // 只有brandCode参数时，默认显示该品牌的第一个车系

        let matchedItem;

        this.seriesList.forEach((item, index) => {
          if (item['brandCode'] === params['brandCode']) {
            matchedItem = this.seriesList[index];
          }
        });

        this.setQueryString(params['brandCode'], matchedItem['series'][0]['seriesCode']);

        return;
      }

      this.activeBrandCode = params['brandCode'];
      this.activeSeriesCode = params['seriesCode'];
    });
  }

  setSeriesList(data: Array<Object>): void {

    this.seriesList = data;

    this.setQueryString(this.activeBrandCode || this.seriesList[0]['brandCode'], this.activeSeriesCode || this.seriesList[0]['series'][0]['seriesCode']);
  }

  onCLickBrand(data): void {

    this.setQueryString(data.brandCode, data.series[0]['seriesCode']);
  }

  onClickSeries(data): void {

    this.setQueryString(this.activeBrandCode, data.seriesCode);
  }

  setQueryString(brandCode: string, seriesCode: string): void {

    this.router.navigate(['/catalog'], {
      queryParams: {
        brandCode: brandCode,
        seriesCode: seriesCode
      }
    });
  }
}
