import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SeriesListService} from './series-list.service';

@Component({
  selector: 'series-list',
  templateUrl: './series-list.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    SeriesListService
  ]
})
export class SeriesListComponent implements OnInit {

  private seriesList: Array<Object> = null;
  private activeBrandCode: string;
  private activeSeriesCode: string;
  private setBrandDefaultSeriesTask: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesListService
  ) {
  }

  ngOnInit() {

    this.seriesService
      .loadList()
      .subscribe(res => this.setSeriesList(res));

    this.activatedRoute.queryParams.subscribe((params) => {

      if (!params['brandCode']) {

        if (this.seriesList) {  // 不带任何参数跳转时，默认显示第一个品牌的第一个车系

            this.setUrl(this.seriesList[0]['brandCode'], this.seriesList[0]['series'][0]['seriesCode']);
        }

        return;
      } else if (!params['seriesCode']) {  // 只有brandCode参数时，默认显示该品牌的第一个车系

        if (this.seriesList) {

          this.setBrandDefaultSeries(params['brandCode']);
        } else {

          this.setBrandDefaultSeriesTask = {
            brandCode: params['brandCode']
          };
        }

        return;
      }

      this.activeBrandCode = params['brandCode'];
      this.activeSeriesCode = params['seriesCode'];
    });
  }

  setSeriesList(data: Array<Object>): void {

    this.seriesList = data;

    if (this.setBrandDefaultSeriesTask) {

      this.setBrandDefaultSeries(this.setBrandDefaultSeriesTask.brandCode);

      this.setBrandDefaultSeriesTask = null;
      return;
    }

    this.setUrl(this.activeBrandCode || this.seriesList[0]['brandCode'], this.activeSeriesCode || this.seriesList[0]['series'][0]['seriesCode']);
  }

  setBrandDefaultSeries(brandCode: string): void {

    let matchedItem;

    this.seriesList.forEach((item, index) => {
      if (item['brandCode'] === brandCode) {
        matchedItem = this.seriesList[index];
      }
    });

    this.setUrl(brandCode, matchedItem['series'][0]['seriesCode']);
  }

  onCLickBrand(data): void {

    this.setUrl(data.brandCode, data.series[0]['seriesCode']);
  }

  onClickSeries(data): void {

    this.setUrl(this.activeBrandCode, data.seriesCode);
  }

  setUrl(brandCode: string, seriesCode: string): void {

    this.router.navigate(['/catalog'], {
      queryParams: {
        brandCode: brandCode,
        seriesCode: seriesCode
      }
    });
  }
}
