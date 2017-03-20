import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {UsageListService} from './usage-list.service';
import {SubjectService} from '../../../common/services/subject.service';

@Component({
  selector: 'usage-list',
  templateUrl: './usage-list.html',
  styleUrls: ['./usage-list.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UsageListService
  ]
})
export class UsageListComponent implements OnInit {

  private usageList: Array<any> = [];
  private isShow: boolean = false;
  private checkedCallout: string = '';
  private isRightCollapsed: boolean = false;

  constructor(
    private usageListService: UsageListService,
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['callout']) {
        this.checkedCallout = params['callout'];
      }
    });

    this.subjectService.subscribe('usage-list:show', (data) => {

      this.isShow = true;
      this.setUsageList(data);
    });

    this.subjectService.subscribe('usage-list:hide', () => {
      this.isShow = false;
    });

    this.subjectService.subscribe('usage-list:select', (callout) => {

      this.checkedCallout = callout;
    });

    this.subjectService.subscribe('legend:right-collapsed', (data) => {
      this.isRightCollapsed = data;
    });
  }

  setUsageList(data: Array<Object>): void {

    this.usageListService
      .loadList({
      imageCode: data['images'][0]['code']
      })
      .subscribe((res) => {
        this.usageList = res;
      });
  }

  onClickItem(callout: string): void {

    this.checkedCallout = callout;
    this.subjectService.trigger('legend:select', callout);
    this.setUrl(callout);
  }

  onClickIcon(e): void {

    e.stopPropagation();

    this.subjectService.trigger('growl:show', {
      type: 'info',
      title: '提示',
      content: '该功能尚未实现'
    });
  }

  setUrl(callout: String): void {

    let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let queryParams = {};

    Object.assign(queryParams, routeSnapshot.queryParams);

    queryParams['callout'] = callout;

    this.router.navigate(['/model'], {
      queryParams
    });
  }
}
