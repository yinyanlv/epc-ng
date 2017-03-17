import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SubjectService} from '../../common/services/subject.service';

@Component({
  templateUrl: './model.html',
  styleUrls: ['./model.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModelComponent implements OnInit{

  private isShow: boolean = false;
  private isLeftCollapsed: boolean = false;

  constructor(
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.subjectService.subscribe('legend-wrapper:show', (data) => {

      this.isShow = true;
    });

    this.subjectService.subscribe('legend-wrapper:hide', () => {
      this.isShow = false;
    });

    this.subjectService.subscribe('legend:left-collapsed', (data) => {
      this.isLeftCollapsed = data;
    });
  }
}

