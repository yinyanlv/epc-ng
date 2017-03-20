import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {GroupTreeService} from './group-tree.service';
import {SubjectService} from '../../../common/services/subject.service';

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
  private expandNodeList: Array<any> = [];
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
      if (params['nodeCode']) {
        this.setExpandNodeList(params['nodeCode']);
      }
    });

    this.subjectService.subscribe('legend:left-collapsed', (data) => {
      this.isLeftCollapsed = data;
    });

    this.subjectService.subscribe('group-tree:activate', (data) => {
      this.activateNode(data['images'][0]['code']);
    });
  }

  setGroupTree(data: Array<Object>): void {

    this.checkedNodeCode = data[0]['code'];
    this.onClickNode('group', data[0]);
    this.groupList = data;
  }

  activateNode(nodeCode: string): void {

    this.checkedNodeCode = nodeCode;
    this.setExpandNodeList(nodeCode);
  }

  setExpandNodeList(nodeCode: string) {

    let temp = [];

    for (let i = 0; i < this.groupList.length; i++) {

      let group = this.groupList[i];

      if (group['code'] === nodeCode) {

        break;
      }

      for (let j = 0; j < group['subGroup'].length; j++) {
        let subGroup = group['subGroup'][j];

        if (subGroup['code'] === nodeCode) {

          temp.push(group['code']);
          break;
        }

        for (let k = 0; k < subGroup['images'].length; k++) {
          let image = subGroup['images'][k];

          if (image['code'] === nodeCode) {

            temp.push(group['code']);
            temp.push(subGroup['code']);
            break;
          }
        }
      }
    }

    this.expandNodeList = temp;
  }

  onClickNode(type: string, data: Object) {

    let nodeCode;

    if (type === 'group') {

      nodeCode = data['code'];

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', data['subGroup']);
    }

    if (type === 'sub-group') {

      nodeCode = data['code'];

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', [data]);
    }

    if (type === 'image') {

      nodeCode = data['images'][0]['code'];

      this.subjectService.trigger('legend-list:hide', null);
      this.subjectService.trigger('legend-wrapper:show', null);
      this.subjectService.trigger('legend:show', data);
    }

    this.setUrl(nodeCode);
  }

  setUrl(nodeCode: String): void {

    let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let queryParams = {};

    Object.assign(queryParams, routeSnapshot.queryParams);

    queryParams['nodeCode'] = nodeCode;
    delete queryParams['callout'];

    this.router.navigate(['/model'], {
      queryParams
    });
  }
}