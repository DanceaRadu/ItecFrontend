import {Component, OnInit} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {ApplicationService} from "../../../../service/application.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss'
})
export class AppPageComponent implements OnInit{

  application: Application | undefined;
  id: string | null = null;
  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) return;
      this.applicationService.getAppById(parseInt(this.id)).subscribe(application => {
        this.application = application;
        console.log(application)
      });
    });
  }
}
