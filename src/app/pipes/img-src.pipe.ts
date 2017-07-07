import {Pipe, PipeTransform} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';

@Pipe({
  name: 'imgSrc'
})
export class ImgSrcPipe implements PipeTransform{

  constructor(
    private globalConfig: GlobalConfigService
  ) {
  }

  transform(src: string) {

    return this.globalConfig.get('path') + '/' + src;
  }
}
