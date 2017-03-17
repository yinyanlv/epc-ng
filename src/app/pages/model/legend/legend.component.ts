import {Component, OnInit, AfterViewInit} from '@angular/core';

import {LegendService} from './legend.service';
import {SubjectService} from '../../../common/services/subject.service';

let globalRequire = window['require'];
let $ = window['jQuery'];

@Component({
  selector: 'app-legend',
  templateUrl: './legend.html',
  providers: [
    LegendService
  ]
})
export class LegendComponent implements OnInit, AfterViewInit{

  private isShow: boolean = false;
  private $legendBody;
  private legendLoaded: boolean = false;

  constructor(
    private legendService: LegendService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.subjectService.subscribe('legend:show', (data) => {

      this.isShow = true;
      this.setLegend(data);
    });

    this.subjectService.subscribe('legend:hide', () => {
      this.isShow = false;
    });
  }

  ngAfterViewInit() {

    this.$legendBody = $ && $('#legend-body');
    this.initSvgHotpoint();
  }

  setLegend(data: Object): void {

    this.loadSvgLegend(data['images'][0].svgFile);
    this.subjectService.trigger('usage-list:show', data);
  }

  initSvgHotpoint() {

    this.$legendBody.svgHotpoint({
      host: '',
      tbodyId: 'parts-body',
      rowBgColor: '#A7CDF1',
      callbacks: {
        onSelectionCallout: function(callout) {
          alert('callout');
        }
      }
    });
  }

  loadSvgLegend(svgUrl) {

    let self = this;

    this.$legendBody.svgHotpoint('loadSVG', {
      url: svgUrl,
      loaded: function() {
        self.legendLoaded = true;
      }
    });
  }
}
