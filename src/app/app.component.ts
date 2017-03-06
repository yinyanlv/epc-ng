import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: '<router-outlet></router-outlet>',
  styleUrls: [
    '../../node_modules/primeng/resources/themes/omega/theme.css',
    '../../node_modules/primeng/resources/primeng.css',
    './app.component.scss',
  ]
})
export class AppComponent {
}
