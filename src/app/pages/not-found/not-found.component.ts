import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotFoundComponent {

  onClickBack() {
    window.history.back();
  }
}
