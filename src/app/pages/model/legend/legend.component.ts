import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {SubjectService} from '../../../common/services/subject.service';

let globalRequire = window['require'];
let $;

@Component({
  selector: 'app-legend',
  templateUrl: './legend.html'
})
export class LegendComponent implements OnInit, AfterViewInit{

  private isLeftCollapsed: boolean = false;
  private isRightCollapsed: boolean = false;
  private legendTitle: string = '';
  private $legendBody;
  private legendTask: any = null;
  private calloutTask: any = null;
  private isSvgHotpointInited: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      if (params['callout']) {

        if (!this.isSvgHotpointInited) {

          this.calloutTask = {
            name: 'select-callout',
            data: [params['callout']]
          };
        } else {

          this.$legendBody.svgHotpoint('highlightCallout', [params['callout']]);
        }
      }
    });

    this.subjectService.subscribe('legend:show', (data) => {

      if (!this.isSvgHotpointInited) {

        this.legendTask = {
          name: 'show-legend',
          data
        };
      } else {

        this.setLegend(data);
      }
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

          self.setUrl(callout);
        }
      }
    });

    this.isSvgHotpointInited = true;

    this.runLegendTasks();
  }

  runLegendTasks() {

    if (this.legendTask) {

      if (this.legendTask.name === 'show-legend') this.setLegend(this.legendTask.data);

      this.legendTask = null;
    }

    // this.runCalloutTasks();
  }

  runCalloutTasks() {

    if (this.calloutTask) {

      if (this.calloutTask.name === 'select-callout') this.$legendBody.svgHotpoint('highlightCallout', this.calloutTask.data);

      this.calloutTask = null;
    }
  }

  loadSvgLegend(svgUrl): void {

    let self = this;

    this.$legendBody.svgHotpoint('loadSVG', {
      url: svgUrl,
      loaded: function() {

        setTimeout(() => {

          self.runCalloutTasks();
        }, 0);
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
