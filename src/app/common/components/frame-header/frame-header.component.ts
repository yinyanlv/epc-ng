import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'frame-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './frame-header.html',
  styleUrls: ['./frame-header.scss']
})
export class FrameHeaderComponent implements OnInit{

  private searchList: Array<any>;
  private placeholder: string;
  @ViewChild('searchType')
  private searchType;

  constructor(
    private subject: SubjectService
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

      this.subject.trigger('advance-query:show', val);
    } else {

      alert('请输入内容');
    }
  }

  doAdvanceQuery(val: string) {

    if (this.isValid(val)) {

      this.subject.trigger('advance-query:show', val);
    } else {

      alert('请输入内容');
    }
  }

  isValid(val: string) {

    return val ? true : false;
  }
}
