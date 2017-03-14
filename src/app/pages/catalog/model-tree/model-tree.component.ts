import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ModelTreeService} from './model-tree.service';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.html',
  providers: [
    ModelTreeService
  ]
})
export class ModelTreeComponent {

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
          console.log(res);
        });
    });
  }
}
