import {AfterViewInit, Component, Input} from '@angular/core';
import {Application} from "../../../../entity/Application";

@Component({
  selector: 'app-app-statistics',
  templateUrl: './app-statistics.component.html',
  styleUrl: './app-statistics.component.scss'
})
export class AppStatisticsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    console.log(this.app)
  }
  @Input({required:true}) app?: Application



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
