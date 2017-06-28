import {Pipe, PipeTransform} from '@angular/core';

import {serverMap} from '../config/server-config';

@Pipe({
  name: 'rebuildImgSrc'
})
export class RebuildImgSrcPipe implements PipeTransform{

  transform(src: string) {

    return serverMap.basePath + '/' + src;
  }
}
