import {Component, ViewEncapsulation, OnInit} from '@angular/core';

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
  private brandList: Array<Object> = [{label: '请选择', value: ''}];
  private seriesList: Array<Object> = [{label: '请选择', value: ''}];
  private modelGroupList: Array<Object> = [{label: '请选择', value: ''}];
  private modelList: Array<Object> = [{label: '请选择', value: ''}];
  private brand: string = '';
  private series: string = '';
  private modelGroup: string = '';
  private model: string = '';
  private queryResult: any = [];

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

    this.queryService
      .load('brand', {})
      .subscribe((res) => {
        this.setSelect('brand', res);
      });
  }

  onSelectChange(clearList: Array<string>, depend: Object) {

    clearList.forEach((value) => {
      this[value] = '';
      this[value + 'List'] = [{label: '请选择', value: ''}];
    });

    this.queryService
      .load(clearList[0], depend)
      .subscribe((res) => {
        this.setSelect(clearList[0], res);
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

    if (this.validate()) {
      this.queryService
        .query(this.getParams())
        .subscribe((res) => {
          this.queryResult = res;
        });
    }
  }

  onClickReset() {

    this.brand = '';
    this.series = '';
    this.modelGroup = '';
    this.model = '';
    this.partNo = '';
    this.partName = '';

    this.seriesList = [{label: '请选择', value: ''}];
    this.modelGroupList = [{label: '请选择', value: ''}];
    this.modelList = [{label: '请选择', value: ''}];
  }

  getParams() {

    let params = {};

    ['brand', 'series', 'modelGroup', 'model'].forEach((value) => {

      if (this[value]) {
        params[value + 'Code'] = this[value];
      }
    });

    if (this.partNo) {
      params['partNo'] = this.partNo;
    }

    if (this.partName) {
      params['partName'] = this.partName;
    }

    return params;
  }

  validate() {

    if (this.brand) {

      return true;
    } else {

      this.subjectService.trigger('growl:show', {
        type: 'error',
        title: '错误提示',
        content: '品牌为必输项，请选择品牌'
      });

      return false;
    }
  }
}
