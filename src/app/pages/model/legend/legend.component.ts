import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LegendService} from './legend.service';

@Component({
  selector: 'legend',
  templateUrl: './legend.html',
  providers: [
    LegendService
  ]
})
export class LegendComponent {

  private modelList: Array<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private legendService: LegendService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.legendService
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
