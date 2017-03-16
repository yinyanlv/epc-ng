import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GroupTreeService} from './group-tree.service';

@Component({
  selector: 'group-tree',
  templateUrl: './group-tree.html',
  providers: [
    GroupTreeService
  ]
})
export class GroupTreeComponent {

  private modelList: Array<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupTreeService: GroupTreeService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.groupTreeService
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
