import './config/rxjs-config';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {LoginModule} from './pages/login/login.module';
import {CatalogModule} from './pages/catalog/catalog.module';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {LoginMock} from './mock/login.mock';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    // InMemoryWebApiModule.forRoot(LoginMock),
    LoginModule,
    CatalogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
