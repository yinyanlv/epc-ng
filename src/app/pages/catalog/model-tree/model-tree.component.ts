import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ModelTreeService} from './model-tree.service';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.html',
  providers: [
    ModelTreeService
  ]
})
export class ModelTreeComponent implements OnInit {

  private modelList: Array<any> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modelTreeService: ModelTreeService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.modelTreeService
        .loadList(params)
        .subscribe((res) => {
          this.setModelTree(res);
        });
    });
  }

  setModelTree(data: Array<Object>): void {

    this.modelList = data;
  }
}
