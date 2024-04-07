import {Component, EventEmitter} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {Application} from "../../../entity/Application";
import {ApplicationShort} from "../../../entity/ApplicationShort";

@Component({
  selector: 'app-choose-app',
  templateUrl: './choose-app.component.html',
  styleUrl: './choose-app.component.scss'
})
export class ChooseAppComponent {

  foundApps: Application[] = [];
  isLoading = false;
  onAdd = new EventEmitter<ApplicationShort>();

  constructor(private applicationService: ApplicationService) {
  }

  handleSearch(query: string) {
    this.foundApps = []
    this.isLoading = true;
    this.applicationService.search(query).subscribe(apps => {
      this.foundApps = apps;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    })
  }
}
