import {Component, OnInit} from '@angular/core';

import {GroupTreeService} from './group-tree.service';
import {SubjectService} from '../../../common/services/subject.service';

@Component({
  selector: 'group-tree',
  templateUrl: './group-tree.html',
  styleUrls: ['./group-tree.scss'],
  providers: [
    GroupTreeService
  ]
})
export class GroupTreeComponent implements OnInit {

  private groupList: Array<any> = [];
  private checkedNodeCode: string = '';

  constructor(
    private groupTreeService: GroupTreeService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.groupTreeService
      .loadList({})
      .subscribe((res) => {
        this.setGroupTree(res);
      });
  }

  setGroupTree(data: Array<Object>): void {

    this.checkedNodeCode = data[0]['code'];
    this.onClickNode('group', data[0]);
    this.groupList = data;
  }

  onClickNode(type: string, data: Object) {

    if (type === 'group') {

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-list:show', data['subGroup']);
    }

    if (type === 'sub-group') {

      this.subjectService.trigger('legend:hide', null);
      this.subjectService.trigger('usage-list:hide', null);
      this.subjectService.trigger('legend-list:show', [data]);
    }

    if (type === 'image') {

      this.subjectService.trigger('legend-list:hide', null);
      this.subjectService.trigger('legend:show', data);
    }
  }
}
