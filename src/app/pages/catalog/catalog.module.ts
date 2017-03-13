import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DropdownModule, DialogModule, DataTableModule, SharedModule, TreeModule} from 'primeng/primeng';

import {CatalogComponent} from './catalog.component';
import {SeriesListComponent} from './series-list/series-list.component';
import {ModelTreeComponent} from './model-tree/model-tree.component';
import {NavigationComponent} from '../../common/components/navigation/navigation.component';
import {FrameHeaderComponent} from '../../common/components/frame-header/frame-header.component';
import {CrumbsComponent} from '../../common/components/crumbs/crumbs.component';
import {NavigationService} from '../../common/components/navigation/navigation.service';
import {QueryComponent} from '../../common/components/query/query.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FrameHeaderComponent,
    CrumbsComponent,
    CatalogComponent,
    QueryComponent,
    SeriesListComponent,
    ModelTreeComponent
  ],
  imports: [
    RouterModule,  // 不导入则不能使用[routerLink]指令
    DropdownModule,
    DialogModule,
    DataTableModule,
    SharedModule,
    TreeModule
  ],
  providers: [
    NavigationService
  ]
})
export class CatalogModule {

}
