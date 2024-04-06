import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {ApplicationService} from "../../../../service/application.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment.development";
import {Endpoint} from "../../../../entity/Endpoint";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss'
})
export class AppPageComponent implements OnInit, OnDestroy {

  application: Application | undefined;
  id: string | null = null;
  private webSocket: WebSocket | null = null;
  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newId = params.get('id');
      if (newId !== this.id) {
        this.id = newId;
        if (!this.id) return;
        this.applicationService.getAppById(parseInt(this.id)).subscribe(application => {
          this.application = application;
          this.establishWebSocketConnection(); // Call this method to establish or re-establish the WebSocket connection
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.closeWebSocketConnection();
  }

  private establishWebSocketConnection(): void {
    this.closeWebSocketConnection();

    if (this.id) {
      this.webSocket = new WebSocket(`${environment.baseWsUrl}/application/${this.application?.uid}`);

      this.webSocket.onmessage = (event) => {
        try {
          const parsedApp: Application = JSON.parse(event.data);
          let newEndpoints: Endpoint[] = this.application ? JSON.parse(JSON.stringify(this.application.endpoints)) : [];
          this.application?.endpoints?.forEach((endpoint, index) => {
            if (endpoint.log && parsedApp.endpoints && parsedApp.endpoints[index].log != undefined) {
              newEndpoints[index].log?.push(parsedApp.endpoints[index].log!![0])
            }
          })
          parsedApp.endpoints = newEndpoints
          this.application = parsedApp;
          console.log(parsedApp)
          console.log(this.application)
        } catch (error) {
          console.log("Error parsing json")
        }
      };

      this.webSocket.onerror = (error) => {
        console.error('WebSocket Error: ', error);
      };

      this.webSocket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  }

  private closeWebSocketConnection(): void {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
  }
}
