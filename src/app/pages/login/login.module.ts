import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/primeng';
import {TranslateModule} from 'ng2-translate';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    DropdownModule,
    TranslateModule
  ],
  providers: [LoginService]
})
export class LoginModule {

}
