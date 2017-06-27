import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from 'ng2-translate';

import {AppSharedModule} from '../../common/modules/app-shared.module';
import {ModelComponent} from './model.component';
import {LegendListComponent} from './legend-list/legend-list.component';
import {GroupTreeComponent} from './group-tree/group-tree.component';
import {UsageListComponent} from './usage-list/usage-list.component';
import {LegendComponent} from './legend/legend.component';
import {NavigationService} from '../../common/components/navigation/navigation.service';
import {routing} from './model.routing';

@NgModule({
  declarations: [
    ModelComponent,
    LegendListComponent,
    GroupTreeComponent,
    UsageListComponent,
    LegendComponent
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
export class ModelModule {

}
