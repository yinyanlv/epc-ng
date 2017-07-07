import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/primeng';
import {TranslateModule} from 'ng2-translate';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    TranslateModule
  ],
  providers: [LoginService]
})
export class LoginModule {

}
