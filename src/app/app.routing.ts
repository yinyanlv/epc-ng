import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {CanActivateGuardService} from './services/can-activate-guard.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'catalog',
  loadChildren: './pages/catalog/catalog.module#CatalogModule',
  canActivate: [CanActivateGuardService]
}, {
  path: 'model',
  loadChildren: './pages/model/model.module#ModelModule',
  canActivate: [CanActivateGuardService]
}, {
  path: '**',
  component: NotFoundComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
