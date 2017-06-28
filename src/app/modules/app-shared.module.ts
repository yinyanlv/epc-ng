import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {DropdownModule, DialogModule, DataTableModule, SharedModule, GrowlModule} from 'primeng/primeng';
import {TranslateModule} from 'ng2-translate';

import {RebuildImgSrcPipe} from '../pipes/rebuild-img-src.pipe';

import {CrumbsComponent} from '../components/crumbs/crumbs.component';
import {FrameHeaderComponent} from '../components/frame-header/frame-header.component';
import {GrowlComponent} from '../components/growl/growl.component';
import {NavigationComponent} from '../components/navigation/navigation.component';
import {QueryComponent} from '../components/query/query.component';

@NgModule({
  declarations: [
    CrumbsComponent,
    FrameHeaderComponent,
    GrowlComponent,
    NavigationComponent,
    QueryComponent,
    RebuildImgSrcPipe
  ],
  exports: [
    CrumbsComponent,
    FrameHeaderComponent,
    GrowlComponent,
    NavigationComponent,
    QueryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    TranslateModule
  ]
})
export class AppSharedModule {

}
