import {NgModule} from '@angular/core';
import {DropdownModule} from 'primeng/primeng';


import {CatalogComponent} from './catalog.component';
import {NavigationComponent} from '../../common/components/navigation/navigation.component';
import {FrameHeaderComponent} from '../../common/components/frame-header/frame-header.component';
import {CrumbsComponent} from '../../common/components/crumbs/crumbs.component';
import {NavigationService} from '../../common/components/navigation/navigation.service';

@NgModule({
  declarations: [
    NavigationComponent,
    FrameHeaderComponent,
    CrumbsComponent,
    CatalogComponent
  ],
  imports: [
    DropdownModule
  ],
  providers: [
    NavigationService
  ]
})
export class CatalogModule {

}
