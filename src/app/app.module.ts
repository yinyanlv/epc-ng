import './config/rxjs-config';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {DropdownModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {TranslateModule, TranslateLoader} from 'ng2-translate';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {LoginModule} from './pages/login/login.module';
import {CatalogModule} from './pages/catalog/catalog.module';
import {ModelModule} from './pages/model/model.module';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {SubjectService} from './common/services/subject.service';
import {GlobalStateService} from './common/services/global-state.service';
import {CanActivateGuardService} from './common/services/can-activate-guard.service';
import {SelectService} from './common/services/select.service';
import {HandleErrorService} from './common/services/handle-error.service';
import {createTranslateLoader} from './common/utils/translate';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    DialogModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    routing,
    LoginModule,
    CatalogModule,
    ModelModule,
    NotFoundModule
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
