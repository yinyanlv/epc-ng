import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {LegendService} from './legend.service';
import {SubjectService} from '../../../common/services/subject.service';

let globalRequire = window['require'];
let $;

@Component({
  selector: 'app-legend',
  templateUrl: './legend.html',
  providers: [
    LegendService
  ]
})
export class LegendComponent implements OnInit, AfterViewInit{

  private isLeftCollapsed: boolean = false;
  private isRightCollapsed: boolean = false;
  private legendTitle: string = '';
  private $legendBody;
  private legendLoaded: boolean = false;

  constructor(
    private legendService: LegendService,
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['callout']) {
        this.$legendBody.svgHotpoint("highlightCallout", [params['callout']]);
      }
    });

    this.subjectService.subscribe('legend:show', (data) => {

      this.setLegend(data);
    });

    this.subjectService.subscribe('legend:hide', () => {

    });

    this.subjectService.subscribe('legend:select', (callout) => {

      this.$legendBody.svgHotpoint("highlightCallout", [callout]);
    });
  }

  ngAfterViewInit() {
    let self = this;

    globalRequire(['jquerySvgHotpoint', 'scrollIntoView', 'snap'], function () {
      $ = window['jQuery'];

      self.$legendBody = $('#legend-body');
      self.initSvgHotpoint();
    });
  }

  setLegend(data: Object): void {

    this.legendTitle = data['name'];
    this.loadSvgLegend(data['images'][0].svgFile);
    this.subjectService.trigger('usage-list:show', data);
  }

  initSvgHotpoint(): void {

    let self = this;

    this.$legendBody.svgHotpoint({
      host: '',
      tbodyId: 'parts-body',
      rowBgColor: '#A7CDF1',
      callbacks: {
        onSelectionCallout: function(callout) {

          self.subjectService.trigger('usage-list:select', callout);
          self.setUrl(callout);
        }
      }
    });
  }

  loadSvgLegend(svgUrl): void {

    let self = this;

    this.$legendBody.svgHotpoint('loadSVG', {
      url: svgUrl,
      loaded: function() {
        self.legendLoaded = true;
      }
    });
  }

  onClickLeftToggle(): void {

    this.isLeftCollapsed = !this.isLeftCollapsed;
    this.subjectService.trigger('legend:left-collapsed', this.isLeftCollapsed);
  }

  onClickRightToggle(): void {

    this.isRightCollapsed = !this.isRightCollapsed;
    this.subjectService.trigger('legend:right-collapsed', this.isRightCollapsed);
  }

  setUrl(callout: String): void {

    let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let queryParams = {};

    Object.assign(queryParams, routeSnapshot.queryParams);

    queryParams['callout'] = callout;

    this.router.navigate(['/model'], {
      queryParams
    });
  }
}