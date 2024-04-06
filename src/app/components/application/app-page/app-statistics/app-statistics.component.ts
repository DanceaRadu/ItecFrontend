import {Component, Input} from '@angular/core';
import {Application} from "../../../../entity/Application";

@Component({
  selector: 'app-app-statistics',
  templateUrl: './app-statistics.component.html',
  styleUrl: './app-statistics.component.scss'
})
export class AppStatisticsComponent {
  @Input({required:true}) app?: Application

  getStatusClasses(status: string | undefined) {
    return {
      'healthy': status === 'Stable',
      'warning': status === 'Warning',
      'error': status === 'Down'
    };
  }

  goToAppLink() {
    window.open(this.app?.baseUrl, '_blank');
  }

}
