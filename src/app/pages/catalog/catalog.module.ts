import {NgModule} from '@angular/core';

import {CatalogComponent} from './catalog.component';
import {NavigationComponent} from '../../common/components/navigation/navigation.component';
import {FrameHeaderComponent} from '../../common/components/frame-header/frame-header.component';
import {CrumbsComponent} from '../../common/components/crumbs/crumbs.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FrameHeaderComponent,
    CrumbsComponent,
    CatalogComponent
  ],
  imports: [
  ]
})
export class CatalogModule {

}
