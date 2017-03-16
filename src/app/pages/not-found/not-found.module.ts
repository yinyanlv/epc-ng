import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    RouterModule
  ],
  providers: [NotFoundComponent]
})
export class NotFoundModule {

}
