import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {Endpoint} from "../../../../entity/Endpoint";

@Component({
  selector: 'app-app-statistics',
  templateUrl: './app-statistics.component.html',
  styleUrl: './app-statistics.component.scss'
})
export class AppStatisticsComponent implements OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.app) return;
    if(this.app.endpoints === undefined) return;
    if(this.app.endpoints.length === 0) return;
    this.selectedEndpoint = this.app.endpoints[0]
    this.selectedEndpointRelativeUrl = this.selectedEndpoint.relativeUrl;
  }

  @Input({required:true}) app!: Application
  selectedEndpoint: Endpoint | undefined;
  selectedEndpointRelativeUrl: string = "";

  getStatusClasses(status: string | undefined) {
    return {
      'healthy': status === 'Stable',
      'warning': status === 'Unstable',
      'error': status === 'Down'
    };
  }

  onEndpointChange(event: any) {
    this.selectedEndpoint = this.app.endpoints?.find(endpoint => endpoint.relativeUrl === this.selectedEndpointRelativeUrl);
  }

  goToAppLink() {
    let baseUrl = this.app?.baseUrl;
    if (baseUrl) {
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'http://' + baseUrl;
      }
      window.open(baseUrl, '_blank');
    }
  }

  getDownTimeString(downTime: number | undefined): string {
    if(downTime === undefined) return "no info";
    if(downTime > 60) {
      return (downTime/60).toFixed(2) + " minutes";
    }
    if(downTime > 3600) {
      return (downTime/3600).toFixed(2) + " hours";
    }
    return Math.floor(downTime) + " seconds";
  }

}
