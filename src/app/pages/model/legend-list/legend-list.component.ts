import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {SubjectService} from '../../../common/services/subject.service';

@Component({
  selector: 'legend-list',
  templateUrl: './legend-list.html',
  encapsulation: ViewEncapsulation.None
})
export class LegendListComponent implements OnInit {

  private legendList: Array<Object> = [];
  private isShow: boolean = true;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subjectService.subscribe('legend-list:show', (data) => {

      this.setLegendList(data);
      this.isShow = true;
    });

    this.subjectService.subscribe('legend-list:hide', () => {

      this.isShow = false;
    });
  }

  setLegendList(data: Array<Object>): void {

    this.legendList = data;
  }

  onClickItem(data: Object): void {

    this.isShow = false;

    this.subjectService.trigger('legend-wrapper:show', null);
    this.subjectService.trigger('legend:show', data);

    this.setUrl(data['images'][0]['code']);
  }

  setUrl(groupCode: String): void {

    let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let queryParams = {};

    Object.assign(queryParams, routeSnapshot.queryParams);

    queryParams['groupCode'] = groupCode;

    this.router.navigate(['/model'], {
      queryParams
    });
  }
}
