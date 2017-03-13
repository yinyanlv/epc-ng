import './config/rxjs-config';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DropdownModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {LoginModule} from './pages/login/login.module';
import {CatalogModule} from './pages/catalog/catalog.module'
import {SubjectService} from './common/services/subject.service';
import {GlobalStateService} from './common/services/global-state.service';
import {CanActivateGuardService} from './common/services/can-activate-guard.service';
import {SelectService} from './common/services/select.service';
import {HandleErrorService} from './common/services/handle-error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    DialogModule,
    routing,
    LoginModule,
    CatalogModule
  ],
  providers: [
    SubjectService,
    GlobalStateService,
    CanActivateGuardService,
    SelectService,
    HandleErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
