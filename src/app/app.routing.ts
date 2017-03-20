import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {ModelComponent} from './pages/model/model.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {CanActivateGuardService} from './common/services/can-activate-guard.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'catalog',
  component: CatalogComponent,
  // loadChildren: './pages/catalog/catalog.module#CatalogModule',
  canActivate: [CanActivateGuardService]
}, {
  path: 'model',
  component: ModelComponent,
  // canActivate: [CanActivateGuardService]
}, {
  path: '**',
  component: NotFoundComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
