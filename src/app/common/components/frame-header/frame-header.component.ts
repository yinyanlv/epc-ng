import {Component, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'frame-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './frame-header.html',
  styleUrls: ['./frame-header.scss']
})
export class FrameHeaderComponent implements OnInit{

  private searchList: Array<any>;

  ngOnInit() {
    this.searchList = [{
      label: 'VIN码',
      value: 'vin'
    }, {
      label: '配件编码',
      value: 'part-no'
    }, {
      label: '配件名称',
      value: 'part-name'
    }, {
      label: '整车编码',
      value: 'vehicle-code'
    }];
  }

  selectChange(e) {

    console.log(e);
  }
}
