import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';

let globalConfig = window['globalConfig'];

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit{

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.translateService.addLangs(['zh', 'en']);
    this.translateService.setDefaultLang('zh');
  }
}
