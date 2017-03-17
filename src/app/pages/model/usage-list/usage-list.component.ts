import {Component, OnInit, ViewEncapsulation} from '@angular/core';

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

  constructor(
    private usageListService: UsageListService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.subjectService.subscribe('usage-list:show', (data) => {

      this.isShow = true;
      this.setUsageList(data);
    });

    this.subjectService.subscribe('usage-list:hide', () => {
      this.isShow = false;
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

    console.log(callout);
  }

  onClickIcon(): void {
    this.subjectService.trigger('growl:show', {
      type: 'info',
      title: '提示',
      content: '该功能尚未实现'
    });
  }
}
