import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {GroupTreeService} from './group-tree.service';
import {SubjectService} from '../../../common/services/subject.service';
import set = Reflect.set;

@Component({
  selector: 'group-tree',
  templateUrl: './group-tree.html',
  styleUrls: ['./group-tree.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    GroupTreeService
  ]
})
export class GroupTreeComponent implements OnInit {

  private groupList: Array<any> = [];
  private checkedNodeCode: string = '';
  private isLeftCollapsed: boolean = false;

  constructor(
    private groupTreeService: GroupTreeService,
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.groupTreeService
      .loadList({})
      .subscribe((res) => {
        this.setGroupTree(res);
      });

    this.activatedRoute.queryParams.subscribe((params) => {

    });

    this.subjectService.subscribe('legend:left-collapsed', (data) => {
      this.isLeftCollapsed = data;
    });
  }

  setGroupTree(data: Array<Object>): void {

    this.checkedNodeCode = data[0]['code'];
    this.onClickNode('group', data[0]);
    this.groupList = data;
  }

  onClickNode(type: string, data: Object) {

    let groupCode;

    if (type === 'group') {

      groupCode = data['code'];

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', data['subGroup']);
    }

    if (type === 'sub-group') {

      groupCode = data['code'];

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', [data]);
    }

    if (type === 'image') {

      groupCode = data['images'][0]['code'];

      this.subjectService.trigger('legend-list:hide', null);
      this.subjectService.trigger('legend-wrapper:show', null);
      this.subjectService.trigger('legend:show', data);
    }

    this.setUrl(groupCode);
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
