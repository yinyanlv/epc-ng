import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ModelComponent} from './model.component';

const routes: Routes = [{
  path: '',
  component: ModelComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
