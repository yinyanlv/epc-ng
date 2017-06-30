import {Pipe, PipeTransform} from '@angular/core';

import {serverMap} from '../config/server-config';

@Pipe({
  name: 'imgSrc'
})
export class ImgSrcPipe implements PipeTransform{

  transform(src: string) {

    return serverMap.basePath + '/' + src;
  }
}
