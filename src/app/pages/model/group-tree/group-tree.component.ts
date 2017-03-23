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

  private isGroupListLoaded: boolean = false;
  private groupList: Array<any> = [];
  private expandNodeList: Array<any> = [];
  private checkedNodeCode: string = '';
  private checkedNodeData: any;
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

        let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
        let queryParams = {};

        Object.assign(queryParams, routeSnapshot.queryParams);

        this.setGroupTree(res);

        this.activateNode(queryParams['nodeCode'] || this.groupList[0]['code'], true);
    });

    this.subjectService.subscribe('legend:left-collapsed', (data) => {
      this.isLeftCollapsed = data;
    });

    this.subjectService.subscribe('group-tree:activate', (data) => {
      this.activateNode(data['images'][0]['code'], false);
    });
  }

  setGroupTree(data: Array<Object>): void {

    this.isGroupListLoaded = true;
    this.groupList = data;
  }

  activateNode(nodeCode: string, isPageInitLoad: boolean): void {

    if (this.isGroupListLoaded) {

      this.checkedNodeCode = nodeCode;
      this.setExpandNodeList(nodeCode, isPageInitLoad);
    }
  }

  setExpandNodeList(nodeCode: string, isPageInitLoad: boolean) {

    let temp = [];

    for (let i = 0; i < this.groupList.length; i++) {

      let group = this.groupList[i];

      if (group['code'] === nodeCode) {

        this.checkedNodeData = group;
        break;
      }

      for (let j = 0; j < group['subGroup'].length; j++) {

        let subGroup = group['subGroup'][j];

        if (subGroup['code'] === nodeCode) {

          this.checkedNodeData = subGroup;

          group['expand'] = true;
          temp.push(group['code']);
          break;
        }

        for (let k = 0; k < subGroup['images'].length; k++) {
          let image = subGroup['images'][k];

          if (image['code'] === nodeCode) {

            this.checkedNodeData = subGroup;

            group['expand'] = true;
            subGroup['expand'] = true;
            temp.push(group['code']);
            temp.push(subGroup['code']);
            break;
          }
        }
      }
    }

    this.expandNodeList = temp;
    this.loadLegend(isPageInitLoad);
  }

  loadLegend(isPageInitLoad: boolean) {

    if (this.checkedNodeData) {

      if (this.expandNodeList.length === 0) {
        this.onClickNode('group', this.checkedNodeData, isPageInitLoad);
      }

      if (this.expandNodeList.length === 1) {
        this.onClickNode('sub-group', this.checkedNodeData, isPageInitLoad);
      }

      if (this.expandNodeList.length === 2) {
        this.onClickNode('image', this.checkedNodeData, isPageInitLoad);
      }
    }
  }

  onClickNode(type: string, data: Object, isPageInitLoad: boolean) {

    let nodeCode;

    if (type === 'group') {

      nodeCode = data['code'];

      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', data['subGroup']);
    }

    if (type === 'sub-group') {

      nodeCode = data['code'];

      this.subjectService.trigger('legend-wrapper:hide', null);
      this.subjectService.trigger('legend-list:show', [data]);
    }

    if (type === 'image') {

      nodeCode = data['images'][0]['code'];

      this.subjectService.trigger('legend-list:hide', null);
      this.subjectService.trigger('legend-wrapper:show', null);
      this.subjectService.trigger('legend:show', data);
    }

    this.setUrl(isPageInitLoad, nodeCode);
  }

  setUrl(isPageInitLoad: boolean, nodeCode: String): void {

    let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let queryParams = {};

    Object.assign(queryParams, routeSnapshot.queryParams);

    queryParams['nodeCode'] = nodeCode;

    if (!isPageInitLoad && queryParams['callout']) {
      delete queryParams['callout'];
    }

    this.router.navigate(['/model'], {
      queryParams
    });
  }
}
