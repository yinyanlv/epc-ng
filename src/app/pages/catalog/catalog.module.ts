import {NgModule} from '@angular/core';
import {DropdownModule, DialogModule, DataTableModule, SharedModule} from 'primeng/primeng';

import {CatalogComponent} from './catalog.component';
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
    QueryComponent
  ],
  imports: [
    DropdownModule,
    DialogModule,
    DataTableModule,
    SharedModule
  ],
  providers: [
    NavigationService
  ]
})
export class CatalogModule {

}
