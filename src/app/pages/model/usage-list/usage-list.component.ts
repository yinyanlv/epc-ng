import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {UsageListService} from './usage-list.service';
import {SubjectService} from '../../../common/services/subject.service';

let globalRequire = window['require'];
let $;

@Component({
  selector: 'usage-list',
  templateUrl: './usage-list.html',
  styleUrls: ['./usage-list.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UsageListService
  ]
})
export class UsageListComponent implements OnInit, AfterViewInit {

  private usageList: Array<any> = [];
  private checkedCallout: string = '';
  private isRightCollapsed: boolean = false;
  private calloutTaskId: string = '';

  constructor(
    private usageListService: UsageListService,
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.checkedCallout = params['callout'] || '';
      if (this.checkedCallout) {

        if ($) {

          setTimeout(() => {
            let $temp = $(`#parts-body [data-id=${params['callout']}]`);

            if ($temp.length) {
              $temp.scrollIntoView();
            }
          }, 100);
        } else {
          this.calloutTaskId = params['callout'];
        }
      }
    });

    this.subjectService.subscribe('usage-list:show', (data) => {
      this.setUsageList(data);
    });

    this.subjectService.subscribe('legend:right-collapsed', (data) => {
      this.isRightCollapsed = data;
    });
  }

  ngAfterViewInit() {

    let self = this;

    globalRequire(['jquerySvgHotpoint', 'scrollIntoView', 'snap'], function () {

      $ = window['jQuery'];

      if (self.calloutTaskId) {
        setTimeout(() => {

          let $temp = $(`#parts-body [data-id=${self.calloutTaskId}]`);

          if ($temp.length) {
            $temp.scrollIntoView();
          }
        }, 100);
      }
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
