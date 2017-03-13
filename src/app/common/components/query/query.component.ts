import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'dialog-query',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './query.html',
  styleUrls: ['./query.scss']
})
export class QueryComponent implements OnInit{

  private isShow: boolean = false;
  private data: any;

  constructor(
    private subject: SubjectService
  ) {
  }

  ngOnInit() {

    this.subject.subscribe('advance-query:show', (data) => {

      this.isShow = true;

      this.data = data;
    });
  }

}
