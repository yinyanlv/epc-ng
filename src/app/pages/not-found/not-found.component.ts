import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotFoundComponent {

  onClickBack() {
    window.history.back();
  }
}
