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
  }

  @Input({required:true}) app!: Application
  selectedEndpoint: Endpoint | undefined;

  getStatusClasses(status: string | undefined) {
    return {
      'healthy': status === 'Stable',
      'warning': status === 'Warning',
      'error': status === 'Down'
    };
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
}
