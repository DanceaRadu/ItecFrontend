import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {Endpoint} from "../../../../entity/Endpoint";
import {ApplicationService} from "../../../../service/application.service";
import {Ratio} from "../../../../entity/Ratio";

@Component({
  selector: 'app-app-statistics',
  templateUrl: './app-statistics.component.html',
  styleUrl: './app-statistics.component.scss'
})
export class AppStatisticsComponent implements OnChanges {

  constructor(private applicationService: ApplicationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.app) return;
    if(this.app.endpoints === undefined) return;
    if(this.app.endpoints.length === 0) return;
    this.selectedEndpoint = this.app.endpoints[0]
    this.selectedEndpointRelativeUrl = this.selectedEndpoint.relativeUrl;

    this.applicationService.getRatioByEndpointId(this.selectedEndpoint?.uid!!).subscribe(ratio => {
      this.currentRatio = ratio;
    })

  }

  @Input({required:true}) app!: Application
  selectedEndpoint: Endpoint | undefined;
  selectedEndpointRelativeUrl: string = "";
  currentRatio: Ratio | null = null;

  getStatusClasses(status: string | undefined) {
    return {
      'healthy': status === 'Stable',
      'warning': status === 'Unstable',
      'error': status === 'Down'
    };
  }

  onEndpointChange(event: any) {
    this.selectedEndpoint = this.app.endpoints?.find(endpoint => endpoint.relativeUrl === this.selectedEndpointRelativeUrl);
    this.applicationService.getRatioByEndpointId(this.selectedEndpoint?.uid!!).subscribe(ratio => {
      this.currentRatio = ratio;
    })
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
      return (downTime/30).toFixed(2) + " minutes";
    }
    if(downTime > 3600) {
      return (downTime/1800).toFixed(2) + " hours";
    }
    return Math.ceil(downTime*2) + " seconds";
  }

  getPercentage(ratio: number | undefined) {
    if(ratio === undefined) return '0%';
    return Math.round(ratio * 100) + "%";
  }

  getAppStatus(app: Application): string {
    if(app.downTime && app.downTime > 0) return "Down";
    if(app.bugs?.length == 0) return 'Stable';
    else return 'Unstable';
  }

}
