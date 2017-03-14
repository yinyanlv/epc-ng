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
      .subscribe(res => this.render(res));
  }

  render(data: Array<Object>): void {

    this.seriesList = data;
  }
}
