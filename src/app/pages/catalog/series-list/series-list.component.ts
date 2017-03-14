import {Component, ViewEncapsulation, OnInit} from '@angular/core';

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

  constructor(
    private seriesService: SeriesListService
  ) {
  }

  ngOnInit() {
    this.seriesService
      .loadList()
      .subscribe(res => this.setSeriesList(res));
  }

  setSeriesList(data: Array<Object>): void {

    this.seriesList = data;
  }

  onCLickBrand(data) {

    console.log(data);
  }

  onClickSeries(data) {

    console.log(data);
  }
}
