import {NgModule} from '@angular/core';
import {DropdownModule} from 'primeng/primeng';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [DropdownModule],
  providers: [LoginService]
})
export class LoginModule {

}
