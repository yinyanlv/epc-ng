import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from 'ng2-translate';

import {AppSharedModule} from '../../common/modules/app-shared.module';
import {CatalogComponent} from './catalog.component';
import {SeriesListComponent} from './series-list/series-list.component';
import {ModelTreeComponent} from './model-tree/model-tree.component';
import {NavigationService} from '../../common/components/navigation/navigation.service';
import {routing} from './catalog.routing';

@NgModule({
  declarations: [
    CatalogComponent,
    SeriesListComponent,
    ModelTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,  // 不导入则不能使用[routerLink]指令
    TranslateModule,
    AppSharedModule,
    routing
  ],
  providers: [
    NavigationService
  ]
})
export class CatalogModule {

}
