import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';

import {SubjectService} from '../../services/subject.service';
import {QueryService} from './query.service';

@Component({
  selector: 'dialog-query',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './query.html',
  styleUrls: ['./query.scss'],
  providers: [
    QueryService
  ]
})
export class QueryComponent implements OnInit{

  private isShow: boolean = false;
  private partNo: string;
  private partName: any;
  private brandList: Array<Object>;
  private seriesList: Array<Object>;
  private modelGroupList: Array<Object>;
  private modelList: Array<Object>;
  private brand: string;
  private series: string;
  private modelGroup: string;
  private model: string;

  constructor(
    private subjectService: SubjectService,
    private queryService: QueryService
  ) {
  }

  ngOnInit() {

    this.subjectService.subscribe('advance-query:show', (data) => {

      this.isShow = true;

      if (data.type === 'query') {

        data.name === 'part-no' ? (this.partNo = data.value) : (this.partName = data.value);
      }
    });
  }

  onSelectFocus(type: string) {

    this.queryService
      .load(type, {})
      .subscribe((res) => {
        this.setSelect(type, res);
      });
  }

  setSelect(type: string, data: Array<Object>): void {

    switch (type) {

      case 'brand':
          this.brandList = data;
        break;
      case 'series':
          this.seriesList = data;
        break;
      case 'modelGroup':
          this.modelGroupList = data;
        break;
      case 'model':
          this.modelList = data;
        break;
      default:
    }
  }

  onClickQuery() {

  }

  onClickReset() {

    this.brand = '';
    this.series = '';
    this.modelGroup = '';
    this.model = '';
    this.partNo = '';
    this.partName = '';
  }

  getParams() {

  }

  validate() {

  }
}
