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

      if (!params['brandCode'] || !params['seriesCode']) {

        if (this.seriesList) {

          this.setQueryString(this.seriesList[0]['brandCode'], this.seriesList[0]['series'][0]['seriesCode']);
        }

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

    this.setQueryString(data.brandCode, data.series[0].seriesCode);
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
