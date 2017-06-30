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
import {NotFoundModule} from './pages/not-found/not-found.module';
import {SubjectService} from './services/subject.service';
import {GlobalStateService} from './services/global-state.service';
import {CanActivateGuardService} from './services/can-activate-guard.service';
import {SelectService} from './services/select.service';
import {HandleErrorService} from './services/handle-error.service';
import {createTranslateLoader} from './utils/translate';

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
    routing,
    LoginModule,
    NotFoundModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    })
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
