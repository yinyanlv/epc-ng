import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'frame-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './frame-header.html',
  styleUrls: ['./frame-header.scss']
})
export class FrameHeaderComponent implements OnInit{

  public searchList: Array<any>;
  public placeholder: string;
  @ViewChild('searchType')
  private searchType;

  constructor(
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.searchList = [{
      label: '配件编码',
      value: 'part-no',
      placeholder: '请输入完整的配件编码'
    }, {
      label: '配件名称',
      value: 'part-name',
      placeholder: '请输入配件名称关键字'
    }];

    this.searchType.value = this.searchList[0].value;
    this.placeholder = this.searchList[0].placeholder;
  }

  selectChange(e) {

    this.searchType.value = e.value;

    if (e.value === 'part-no') {
      this.placeholder =  this.searchList[0].placeholder;
    } else if (e.value === 'part-name') {
      this.placeholder =  this.searchList[1].placeholder;
    }
  }

  doQuery(val: string) {

    if (this.isValid(val)) {

      this.subjectService.trigger('advance-query:show', {
        type: 'query',
        name: this.searchType.value,
        value: val
      });
    } else {

      this.subjectService.trigger('growl:show', {
        type: 'error',
        title: '错误提示',
        content: this.placeholder
      });
    }
  }

  doAdvanceQuery() {

    this.subjectService.trigger('advance-query:show', {
      type: 'advance-query'
    });
  }

  isValid(val: string) {

    return val ? true : false;
  }
}
